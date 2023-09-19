const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();
const cors = require("cors");

const app = express();
//localhost:3000/
http: app.use(cors());
app.use(express.json());
app.post("/sendmail", async (req, res) => {
  try {
    // get req body
    const { receiverEmail, subject, body } = req.body;
    // extract email list
    console.log(receiverEmail, subject, body);
    let emailArray = receiverEmail.split(",").map((email) => email.trim());
    for (mail of emailArray) console.log(mail, " ");
    console.log(typeof emailArray);
    // const emailList = ["nileshpratap03@gmail.com", "rgcricket518@gmail.com"];

    // sendmail();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    console.log("hi");
    for (email of emailArray) {
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject,
        html: "<p>" + body + "</p>",
      };
      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error" + error);
        } else {
          console.log("Email sent:" + info.response);
        }
      });
    }

    res.send("email send succefully to the email list");
  } catch (error) {
    res.send("error");
  }
});

app.listen(5000, (err) => {
  if (err) {
    console.log("error");
  } else {
    console.log("server listening now");
  }
});
