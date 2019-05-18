import app from "../libs/app";
import Pic from "../models/Pic";

app.get("*", async (req, res) => {
  const {
    query: { id }
  } = req;
  if (id === undefined) {
    res.status(400);
    return res.end();
  }
  try {
    const pic = await Pic.findById(id);
    return res.json(pic);
  } catch (e) {
    console.log(e);
    return res.json({ error: e.message });
  }
});

export default app;
