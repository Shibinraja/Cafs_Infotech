const express = require("express");
const cors = require("cors");
const app = express();
const BodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const crypto = require("crypto");

// app.use(BodyParser.urlencoded({ extended: false }))
// app.use(BodyParser.json())

const router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://shibinraja:karishma@cluster0-l5pvg.azure.mongodb.net/test?retryWrites=true&w=majority";

router.post("/registration", (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    if (err) {
      console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
    }
    console.log("Connected...");
    bcrypt.hash(req.body.register.password, saltRounds, function (err, hash) {
      const id = crypto.randomBytes(16).toString("hex");

      Details = [
        {
          Name: req.body.register.username,
          Email: req.body.register.email,
          DOB: req.body.register.DOB,
          Password: hash,
          profileId: id,
        },
      ];

      const db = client.db("Cafs-Infotech");
      db.collection("Registration").insertMany(Details, function (err, result) {
        if (err) throw err;
        res.json({
          Message: "Profile Created Successfully",
          statusCode: 200,
        });
        return;
      });
      client.close();
    });
  });
});

router.post("/login", (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    if (err) {
      console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
    }
    console.log("Connected...");

    const Email = { Email: req.body.data.email };

    const db = client.db("Cafs-Infotech");
    db.collection("Registration").findOne(Email, function (err, result) {
      bcrypt.compare(
        req.body.data.password,
        result.Password,
        function (err, final) {
          console.log(final);

          if (final == true) {
            res.json({
              Message: "Login Successful",
              statusCode: 200,
              Name: result.Name,
            });
          } else {
            res.json({
              Message: "Login Failed",
              statusCode: 404,
            });
          }
        }
      );
    });
    client.close();
  });
});

module.exports = router;
