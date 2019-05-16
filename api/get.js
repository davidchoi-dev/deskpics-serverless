const app = require("../libs/app");
const { callDB, makeDbParams } = require("../libs/db");

app.get("*", async (req, res) => {
  const {
    query: { id }
  } = req;
  if (id === undefined) {
    return;
  }
  try {
    const result = await callDB(
      "query",
      makeDbParams({
        IndexName: "photoId-index",
        KeyConditionExpression: "photoId = :photoId",
        ExpressionAttributeValues: {
          ":photoId": id
        }
      })
    );
    return res.json(result);
  } catch (e) {
    console.log(e);
    return res.json({ error: e.message });
  }
});

module.exports = app;
