const app = require("../libs/app");

app.post("*", async (req, res) => {
  const { body } = req;
  if (body.challenge) {
    return res.send({
      challenge: req.body.challenge
    });
  }
});
