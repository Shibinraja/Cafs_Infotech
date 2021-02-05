const express = require("express");
const cors = require("cors");
const app = express();
const BodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 8080;


app.use(cors());
app.use(BodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(BodyParser.json({ limit: "50mb", extended: true }));
app.use(express.static(path.join(__dirname,  "../build")));

const userDetails = require("./Routes/UserDetails");
const tableContent = require("./Routes/TableContent");

app.use(userDetails);
app.use(tableContent);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server Running");
});
