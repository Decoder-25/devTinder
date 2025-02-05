require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./models/user")

app.use(express.json());

app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User created successfully.");
    } catch (error) {
        res.status(400).send("Error saving the user:" + err.message);
    }  
});

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const user = await User.find({emailId: userEmail});
        if(user.length == 0){
            res.status(404).send("User not found");
        }
        else {
            res.send(user);
        }
       
    } catch (error) {
        res.status(400).send("Something went wrong");
    }
});

app.get("/feed", async (req,res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (error) {
    res.status(404).send("Something went wrong");
  }
});

app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;

    try {
        await User.findByIdAndUpdate({ _id: userId}, data);
        res.send("user updated successfully");
    } catch (error) {
        res.status(400).send("something went wrong");
    }
});

connectDB()
    .then(() => {
        console.log("Database connection established....");
        const PORT = process.env.PORT || 7000;
        app.listen(PORT,() => {
            console.log(`Server is sucessfully running on port ${PORT}....`);
        });
    })
    .catch((err) => {
        console.error("Database can't be connected!", err);
    });



