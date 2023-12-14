import nodemailer from "nodemailer";
import express from "express";
import transporter from "../index.js";

const router = express.Router()

router.post("/sendApplication", (req, res) => {
  const {
    companys_name,
    companys_email,
    student_name,
    student_major,
    student_city,
    student_email,
    student_phone,
    student_cv
  } = req.body;

  console.log(student_email)
  if(student_email === undefined) {
    res.sendStatus(400);
    return;
  }
    console.log(companys_email);

  const mailOptions = {
    from: "dallani.help@gmail.com",
    to: companys_email,
    cc: student_email,
    subject: `Training application from Dallani for ${student_name}`,
    html: `
      <p>Dear ${companys_name} HR,</p>
      <p>Here is an application for the training opportunity from Dallani Website. Trainee's details are as follows:</p>
      <ul>
        <li><strong>Name:</strong> ${student_name}</li>
        <li><strong>Major:</strong> ${student_major}</li>
        <li><strong>City:</strong> ${student_city}</li>
        <li><strong>Email:</strong> ${student_email}</li>
        <li><strong>Phone Number:</strong> ${student_phone}</li>
      </ul>
      <p>There is an attached CV for your review.</p>
      <p>Please feel free to contact the trainee at the provided email or phone number if further information is needed.</p>
      <p>Best regards</p>
    `,
    attachments: [
      {
        filename: "attachment.pdf",
        path: student_cv,
      },
    ],
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
export {router as sendApplicationRounter};