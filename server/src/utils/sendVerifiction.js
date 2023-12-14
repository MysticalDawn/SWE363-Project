import nodemailer from "nodemailer";
import express from "express";
import transporter from "../index.js";

const router = express.Router()
var verificationCode = "";
router.post("/sendVerification", (req, res) => {
  const {
    student_email,
  } = req.body;
  verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  const mailOptions = {
    from: "dallani.help@gmail.com",
    to: student_email,
    subject: `Verification code to dallani`,
    html: `
      <p>Hello,</p>
      <p>You have signed up in dallani website, your verification code is: ${verificationCode}</p>
      <p>Best regards</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});
router.post("/verifyCode", (req, res) => {
    const {userVerificationCode} = req.body;
    if (userVerificationCode==verificationCode){
        res.status(200).send("Verification code is correct")
    }
    else if (userVerificationCode!=verificationCode){
        res.status(201).send("Verification code is incorrect")
    }
    else{
        res.status(300).send("problem happend")
    }
})
export {router as VerificationRounter};