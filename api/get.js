const app = require("../libs/app");
const { callDB, makeDbParams } = require("../libs/db");

app.get("*", async (req, res) => {
  const {
    query: { lastPhotoId, lastUserId }
  } = req;
  try {
    const result = await callDB(
      "scan",
      makeDbParams({
        Limit: 2,
        ...(lastPhotoId &&
          lastUserId && {
            ExclusiveStartKey: {
              photoId: lastPhotoId,
              userId: lastUserId
            }
          })
      })
    );
    return res.json(result);
  } catch (e) {
    console.log(e);
    return res.json({ error: e.message });
  }
});

module.exports = app;
