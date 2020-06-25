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
        markets {
            type,
            outcomes {
                name,
                odds,
                status
            }
        },
        region,
        startTime,
        status
      },
      cursor
    }
  }
`;

  const { first, after } = req.query;
  fetch({
    query,
    variables: {
      input: { marketTypes: ["MATCH_WINNER"], first: parseInt(first), after },
    },
  })
    .then((r) => {
      console.log(r);
      res.send(r.data);
    })
    .catch((e) => console.log(e));
  console.log("fin");
});

module.exports = router;
