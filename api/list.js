import app from "../libs/app";
import { callDB, makeDbParams } from "../libs/db";

app.get("*", async (req, res) => {
  const {
    query: { lastPhotoId, lastUserId }
  } = req;
  try {
    const result = await callDB(
      "scan",
      makeDbParams({
        Limit: 25,
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

export default app;
