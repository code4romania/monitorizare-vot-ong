const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
const port = 6900;

app.get('/mock', (request, response) => {
  response.send('Hello mock API')
});

app.get('/mock/v1/formulare/versiuni', (request, response) => {
  sendMock(response, path.resolve(__dirname, './public/api/editable.forms.versions.get.json'));
});

app.get('/mock/v1/formulare', (request, response) => {
  const sectionMock = formIdMockPath(request.query['IdFormular']);
  fs.stat(sectionMock, (error) => {
    if (error) {
      sendMock(response, formIdMockPath("empty"));
    } else {
      sendMock(response, sectionMock);
    }
  });
});

app.post('/mock/v1/formulare', (request, response, next) => {
  const nextId = nextFormSetId(readExistingFiles());
  const savedFilename = path.resolve(__dirname, `./public/api/editable.forms.${nextId}.get.json`);
  const body = generateBody(nextId);
  fs.writeFile(savedFilename, JSON.stringify(body, null, 2), 'utf-8', (error) => {
    if (error){
      next(error);
    }else{
      response.json(body);
      updateVersionsAsWell(body);
    }
  });
});

app.put('/mock/v1/formulare', (request, response, next) => {
  const formSetId = request.body.codFormular;
  const savedFilename = path.resolve(__dirname, `./public/api/editable.forms.${formSetId}.get.json`);
  fs.writeFile(savedFilename, JSON.stringify(request.body, null, 2), 'utf-8', (error) => {
    if (error){
      next(error);
    }else{
      response.json(request.body);
    }
  });
});

const updateVersionsAsWell = (newForm) => {
  const versionsBody = fs.readFileSync(path.resolve(__dirname, './public/api/editable.forms.versions.get.json'), 'utf-8');
  const versions = JSON.parse(versionsBody);
  const newVersions = [
    ...versions,
    {
      codFormular: newForm.codFormular,
      statusFormular: newForm.statusFormular || "DRAFT",
      versiune: newForm.versiune || 1,
      descriere: newForm.descriere
    }
  ];
  const newVersionsBody = JSON.stringify(newVersions, null, 2);
  fs.writeFileSync(path.resolve(__dirname, './public/api/editable.forms.versions.get.json'), newVersionsBody, 'utf-8')
};

const formIdMockPath = (id) => path.resolve(__dirname, `./public/api/editable.forms.${id}.get.json`);

const sendMock = (response, path) => {
  fs.readFile(path, "utf-8", (error, data) => {
    if (error) {
      console.error(error);
      response.json([]);
    } else {
      response.json(JSON.parse(data));
    }
  });
};
app.listen(port, () => console.log(`Express started on port ${port}.`));

const readExistingFiles = () => {
  return fs.readdirSync(path.resolve(__dirname, './public/api'))
    .map(fn => fn.split(".")[2])
    .filter(fn => fn.length <= 2)
    .map(fn => ({id: fn}))
};

const generateBody = (nextId) => {
  return {
    sectiuniFormular: [],
    codFormular: nextId,
    statusFormular: "DRAFT",
    versiune: 1,
    descriere: "Test"
  };
};
/*
decoded: numeric e.g 0,1,2, ...
encoded: <letter><digit> e.g. A0, A1, ... B0, ... Z9

decode: digit * 26 + (letter - 'A')
encode: <(numeric % 26) + 'A'><numeric / 26>

 */
const decode = (encoded) => parseInt(encoded.charAt(1)) * 26 + encoded.charCodeAt(0) - 'A'.charCodeAt(0);
const encode = (numeric) => String.fromCharCode(numeric % 26 + 'A'.charCodeAt(0)) + Math.floor(numeric / 26);
const nextFormSetId = (state) => {
  const maxNumericId = state.length === 0
    ? 0
    : state
      .map(form => form.id)
      .map(id => id.length === 1 ? id + '0' : id)
      .map(id => decode(id))
      .sort((left, right) => right - left)[0];
  let newId = encode(maxNumericId + 1);
  return newId.charAt(1) === '0' ? newId.charAt(0) : newId;
};
