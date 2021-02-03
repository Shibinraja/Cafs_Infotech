const express = require('express')
const cors = require('cors')
const app = express();
const BodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10
const fs = require("fs")
const crypto = require("crypto");

const router = express.Router()

const MongoClient = require("mongodb").MongoClient;
const { resolve4 } = require('dns');
const url = "mongodb+srv://shibinraja:karishma@cluster0-l5pvg.azure.mongodb.net/test?retryWrites=true&w=majority";

router.post("/profilecreation" , (req,res)=>{
    MongoClient.connect(url , { useNewUrlParser: true }, function (err, client){
        if(err){
            console.error("Error occurred while connecting to MongoDB Atlas...\n", err)
        }
        console.log("Connected...")

        let skills = req.body.skills

        let prefferedSkills =  Object.keys(skills).filter(list=>{
            return skills[list] === true
          })
          const id = crypto.randomBytes(16).toString("hex")
        Profile = [
            {
            Name:req.body.name,
            Email:req.body.email,
            Mobile:req.body.mobile,
            DOB:req.body.DOB,
            Role:req.body.role,
            ProfileImg:req.body.profileImg,
            DocImg:req.body.docImg,
            ProfileName:req.body.profileName,
            DocName:req.body.docName,
            Gender:req.body.Gender,
            Skills: prefferedSkills,
            profileId:id
            }
        ]

        const db = client.db("Cafs-Infotech");
        db.collection("Profile").insertMany(Profile , function (err , result){
            if(err) throw err;
            res.json({
                Message:"Profile added successfully",
                statusCode:200
            });
            return
        });
        client.close()
    })
})

router.get("/profilefetch" , (req , res)=>{
    MongoClient.connect(url , {useNewUrlParser: true} , function (err , client){
        if(err) throw err;

        let db = client.db("Cafs-Infotech");
        cursor = db.collection("Profile").find({}).toArray()
        cursor.then(data=>{
            res.json(data)
        });
        client.close()
    })
});

router.put("/profileupdate" , (req,res)=>{
    MongoClient.connect(url , { useNewUrlParser: true }, function (err, client){
        if(err){
            console.error("Error occurred while connecting to MongoDB Atlas...\n", err)
        }
        console.log("Connected...")

        console.log(req.body)
        let skills = req.body.updateDetails.skills

        let prefferedSkills =  Object.keys(skills).filter(list=>{
            return skills[list] === true
          })

        let myquery = {profileId:req.body.updateDetails.profileId};

        let updateProfile = {
            $set:{   
            Name:req.body.updateDetails.name,
            Email:req.body.updateDetails.email,
            Mobile:req.body.updateDetails.mobile,
            DOB:req.body.updateDetails.DOB,
            Role:req.body.updateDetails.role, 
            ProfileImg:req.body.updateDetails.profileImg,
            DocImg:req.body.updateDetails.docImg,
            ProfileName:req.body.updateDetails.profileName,
            DocName:req.body.updateDetails.docName,
            Gender:req.body.updateDetails.Gender,
            Skills: prefferedSkills,
            profileId:req.body.updateDetails.profileId
            }
        }
        

        const db = client.db("Cafs-Infotech");
        db.collection("Profile").updateOne(myquery ,updateProfile , function(err, result){
            if(err) throw err;
            res.json({
                Message:"Profile added successfully",
                statusCode:200
            });
            return
        })
        client.close()
    })
})

router.delete('/profiledelete', (req, res) =>{

    MongoClient.connect(url , { useNewUrlParser: true }, function (err, client){
        if (err) throw err;
        const db = client.db("Cafs-Infotech");
        db.collection("Profile").deleteOne({ profileId:req.body.profileId}, function(err, result){
            if (err) throw err;
            console.log("One document deleted")
            res.json({
                Message:"Profile deleted successfully",
                statusCode:200
            });
        })

        client.close()
    });
});
module.exports = router;