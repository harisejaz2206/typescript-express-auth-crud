import nodemailer from "nodemailer";
import mailConfig from "../configs/mail.config";

type EmailOptions = {
  from: string;
  to: string;
  subject: string;
  text: string;
};

type SendMailCallback = (
  error: Error | null,
  info: nodemailer.SentMessageInfo
) => void;

const transporter = nodemailer.createTransport(mailConfig);

const sendEmail = (options: EmailOptions, callback: SendMailCallback) => {
  const mailOptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
  };

  transporter.sendMail(mailOptions, callback);
};

export default sendEmail;
