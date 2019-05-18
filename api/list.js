import app from "../libs/app";
import { callDB, makeDbParams } from "../libs/db";
import Pic from "../models/Pic";

app.get("*", async (req, res) => {
  const {
    query: { page = 0 }
  } = req;
  try {
    const pics = await Pic.find({})
      .limit(25)
      .skip(25 * page);
    return res.json(pics);
  } catch (e) {
    console.log(e);
    return res.json({ error: e.message });
  }
});

export default app;
