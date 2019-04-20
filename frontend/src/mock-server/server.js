const express = require("express");

const app = express();
const port = 6900;

app.get('/mock', (request, response) => {
  response.send('Hello mock API')
});

app.get('/mock/api/editable-forms', (request, response) => {
  response.json({
    forms: [
      {
        id: "A",
        description: "First form",
        version: 3,
        published: true
      },
      {
        id: "B",
        description: "Second form",
        version: 2,
        published: true
      },
      {
        id: "C",
        description: "Third form",
        version: 3,
        published: false
      },
      {
        id: "D",
        description: "Fourth form",
        version: 3,
        published: false
      },
      {
        id: "E",
        description: "Fifth form",
        version: 3,
        published: true
      }
    ]
  });
});

app.listen(port, () => console.log(`Express started on port ${port}.`));
