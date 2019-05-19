import app from "../libs/app";
import Pic from "../models/Pic";
import User from "../models/User";
import Drink from "../models/Drink";

app.post("*", async (req, res) => {
  const {
    body: { email, drink, location, photoUrl }
  } = req;
  try {
    let user = await User.findOne({
      email
    }).populate("photos");
    if (!user) {
      user = await User.create({
        email
      });
    }
    let dbDrink = await Drink.findOne({ name: drink }).populate("photos");
    if (!dbDrink) {
      dbDrink = await Drink.create({ name: drink });
    }
    const pic = await Pic.create({
      photoUrl,
      approved: true,
      location,
      drink: dbDrink.id,
      user: user.id
    });
    dbDrink.photos.push(pic.id);
    user.photos.push(pic.id);
    dbDrink.save();
    user.save();
    return res.json(pic);
  } catch (e) {
    console.log(e);
    return res.json({ error: e.message });
  }
});

export default app;
