const express = require("express");
const app = express();
const port = 3000;
const fetch = require("node-fetch");

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => {
  const accessToken = "your_access_token_from_github";
  const query = `
  query {
    repository(owner:"isaacs", name:"github") {
      issues(states:CLOSED) {
        totalCount
      }
    }
  }`;

  fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.text())
    .then((body) => console.log(body)) // {"data":{"repository":{"issues":{"totalCount":247}}}}
    .catch((error) => console.error(error));
});
