// import the express module and app is use to access all the express()
const express = require("express");
const app = express();

app.use(express.json());

// To avoid proxy errors
const cors = require("cors");
app.use(cors());

//require("./db/conn");
// import the mongoose module
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
// connect with the database
mongoose
  .connect("mongodb://localhost:27017/mydb")
  .then(() => {
    console.log(`connection successful`);
  })
  .catch((e) => {
    console.log(e);
  });

const port = process.env.port || 5001;
const userschema = new mongoose.Schema({
  name: String,
  email: String,
  phno: String,
  password: String,
});
const User = new mongoose.model("User", userschema);

//

const db = mongoose.connection;
// api
app.post("/register", async (req, res) => {
  const { name, mobile, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "Already exist" });
    }
    else
    {
      const user = new User({
        name,
        mobile,
        email,
        password
      });
      // user.save it save the data into database
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "successfully register" });
        }
      });
    }
  });

});
//login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        console.log("login  Successful ");
        res.json({ message: "login succeessful", user: user });
      } else {
        res.send({ message: "password didn't match" });
      }
    } else {
      res.send({ message: "user didn't recognised" });
    }
  });
});
//api sign in

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
