import axios from "axios";
import app from "../libs/app";
import Pic from "../models/Pic";
import Drink from "../models/Drink";

const SLACK_TOKEN = process.env.SLACK_TOKEN;

app.post("*", async (req, res) => {
  const { body } = req;
  if (body.challenge) {
    return res.send({
      challenge: req.body.challenge
    });
  } else {
    const {
      event: { text, files, user }
    } = body;
    if (text && files && user) {
      res.sendStatus(200);
      const regex = /\[.*?\|.\D+\]/;
      if (regex.test(text)) {
        const [parsedText] = text.match(regex);
        const {
          data,
          data: { ok }
        } = await axios(
          `https://slack.com/api/users.profile.get?token=${SLACK_TOKEN}&user=${user}`
        );
        if (ok) {
          const {
            profile: { real_name_normalized: name, email }
          } = data;
          const cleanedText = parsedText.substring(1, parsedText.length - 1);
          const [drink, location] = cleanedText.split("|");
          try {
            const photoUrl = await cloudinaryUpload(files[0].url_private);
            let dbDrink = await Drink.find({ name: drink });
            if (!dbDrink) {
              dbDrink = await Drink.create({ name: drink });
            }
            const pic = await Pic.create({
              photoUrl,
              approved: true,
              location,
              drink: dbDrink.id
            });
            dbDrink.photos.push(pic.id);
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  }
});
