// src/routes/emailRoutes.ts

import express from "express";
import sendEmail from "services/email.service";

type EmailRequest = {
  from: string;
  to: string;
  subject: string;
  text: string;
};

const router = express.Router();

router.post("/send-email", (req, res) => {
  const options: EmailRequest = {
    from: req.body.from || "default-sender@example.com", // You can set a default sender
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text,
  };

  sendEmail(options, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send("Email sent: " + info.response);
    }
  });
});

export default router;
