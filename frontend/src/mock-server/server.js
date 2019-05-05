const express = require("express");
const path = require("path");
const fs = require("fs");

const EDITABLE_FORMS_ALL = path.resolve(__dirname, "./public/api/editable.forms.all.get.json");

const app = express();
const port = 6900;

app.get('/mock', (request, response) => {
  response.send('Hello mock API')
});

app.get('/mock/api/editable-forms', (request, response) => {
  sendMock(response, EDITABLE_FORMS_ALL);
});

app.get('/mock/api/editable-forms/:id', (request, response) => {
  const defaultId = 'A';
  const sectionMock = formIdMockPath(request.params['id'] || defaultId);
  console.log(`Path: ${sectionMock}`);
  fs.stat(sectionMock, (error, stats) => {
    if (error) {
      sendMock(response, formIdMockPath(defaultId));
    } else {
      sendMock(response, sectionMock);
    }
  });
});

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
