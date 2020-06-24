var express = require("express");
var router = express.Router();
const { createApolloFetch } = require("apollo-fetch");

/* GET users listing. */
router.get("/", function (req, res, next) {
  // res.send('respond with a resource');
  const fetch = createApolloFetch({
    uri: "https://api.testing.betr.app/graphql",
  });

  const query = `
  query FootballFixtures($input: FixturesInput!) {
    fixtures(input: $input) {
      fixtures {
        id,
        competition,
        name,
        region,
        startTime,
        status
      },
      cursor
    }
  }
`;

  fetch({
    query,
    variables: { input: {} },
  })
    .then((r) => {
      console.log(r);
      res.send(r.data);
    })
    .catch((e) => console.log(e));
  console.log("fin");
});

module.exports = router;
