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

  sendEmail(options, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send("Email sent: " + info.response);
    }
  });
};
