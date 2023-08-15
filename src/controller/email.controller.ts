// src/controllers/email.controller.ts

import { Request, Response } from "express";
import sendEmail from "../services/email.service";

type EmailRequest = {
  from: string;
  to: string;
  subject: string;
  text: string;
};

export const send = ({ from, to, subject, text }: EmailRequest) => {
  const options: EmailRequest = {
    from: from || "default-sender@example.com",
    to: to,
    subject: subject,
    text: text,
  };
  console.log("Inside the email controller!");
  console.log("Email options:", options);

  sendEmail(options, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully");
    }
  });
};
