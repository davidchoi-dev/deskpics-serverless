import app from "../libs/app";
import Pic from "../models/Pic";

app.post("*", async (req, res) => {
  const {
    body: { location, approved, photoUrl }
  } = req;
  try {
    const pic = await Pic.create({
      location,
      approved,
      photoUrl
    });
    console.log(pic);
    res.json({ pic });
  } catch (e) {
    console.log(e);
  }
});

export default app;
