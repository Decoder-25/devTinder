require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth.js");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
    try {
        // Validation of the data

        validateSignupData(req);

        // Encrypt the password

        const { firstName, lastName, emailId, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        // Creating a new instance for the user model

        const user = new User({
            firstName, lastName, emailId, password: passwordHash,
        });

        await user.save();
        res.send("User created successfully.");

    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
});

app.post("/login", async (req, res) => {

    try {
        const { emailId, password } = req.body;


        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Invalid credentials!");

        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {

            // Create a JWT token 

            const token = await jwt.sign({ _id: user._id }, "DISHA@Tinder$678");

            //Add the token to cookie and send the response back to user
            res.cookie("token", token);
            res.send("Login successful!")
        }
        else {
            throw new Error("Invalid credentials!");
        }

    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }



});

app.get("/profile", userAuth, async (req, res) => {

    try {

        const user = req.user;


        res.send(user);
    }
    catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }

});

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const user = await User.find({ emailId: userEmail });
        if (user.length == 0) {
            res.status(404).send("User not found");
        }
        else {
            res.send(user);
        }

    } catch (error) {
        res.status(400).send("Something went wrong");
    }
});

app.get("/feed", async (req, res) => {
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
        await User.findByIdAndUpdate({ _id: userId }, data);
        res.send("user updated successfully");
    } catch (error) {
        res.status(400).send("something went wrong");
    }
});

connectDB()
    .then(() => {
        console.log("Database connection established....");
        const PORT = process.env.PORT || 7000;
        app.listen(PORT, () => {
            console.log(`Server is sucessfully running on port ${PORT}....`);
        });
    })
    .catch((err) => {
        console.error("Database can't be connected!", err);
    });



