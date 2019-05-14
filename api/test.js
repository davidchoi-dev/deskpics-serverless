const app = require("../libs/app");
const db = require("../libs/db");

app.get("*", async (req, res) => {
  try {
    const result = await db("scan", { TableName: "Deskpics" });
    return res.json({ result });
  } catch (e) {
    console.log(e);
    return res.json({ error: e.message });
  }
});

module.exports = app;
