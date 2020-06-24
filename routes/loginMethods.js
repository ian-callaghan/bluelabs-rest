var express = require("express");
var router = express.Router();
const { createApolloFetch } = require("apollo-fetch");

/* GET users listing. */
router.get("/", function (req, res, next) {
  // res.send('respond with a resource');
  const fetch = createApolloFetch({
    uri: "https://api.testing.betr.app/graphql",
  });

  fetch({
    query: `{
      loginMethods(input: { brandId: "b47818be-ed28-4385-8498-d9be160e9417", phone: "44 7730773398" }) 
    }`,
  }).then((r) => {
    res.send(r.data);
  });
});

module.exports = router;
