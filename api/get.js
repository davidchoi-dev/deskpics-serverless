import app from "../libs/app";
import { callDB, makeDbParams } from "../libs/db";

app.get("*", async (req, res) => {
  const {
    query: { id }
  } = req;
  if (id === undefined) {
    res.status(400);
    return res.end();
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

export default app;
