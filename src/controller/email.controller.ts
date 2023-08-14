// src/controllers/email.controller.ts

import { Request, Response } from "express";
import sendEmail from "../services/email.service";

type EmailRequest = {
  from: string;
  to: string;
  subject: string;
  text: string;
};

export const send = (req: Request, res: Response) => {
  const options: EmailRequest = {
    from: req.body.from || "default-sender@example.com",
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text,
  };
  console.log("Inside the email controller!");
  console.log("Email options:", options);

  sendEmail(options, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send(error.message);
    } else {
      console.log("Email sent successfully");
      res.status(200).send("Email sent: " + info.response);
    }
  });
};
