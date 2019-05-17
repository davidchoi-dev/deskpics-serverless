import axios from "axios";
import app from "../libs/app";

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
            profile: { real_name_normalized: name, email: pk }
          } = data;
          const cleanedText = parsedText.substring(1, parsedText.length - 1);
          const [drink, location] = cleanedText.split("|");
          try {
            const photoUrl = await cloudinaryUpload(files[0].url_private);
            await callDB(
              "put",
              makeDbParams({
                Item: {
                  pk,
                  sk: uuid(),
                  name,
                  drink,
                  location,
                  approved: true,
                  photoUrl
                }
              })
            );
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  }
});
