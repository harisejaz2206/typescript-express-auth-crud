// src/routes/emailRoutes.ts

import express from "express";
import { send } from "../controller/email.controller";

const router = express.Router();

/**
 * @swagger
 * /email/send-email:
 *   post:
 *     summary: Send an email
 *     parameters:
 *       - in: body
 *         name: email
 *         schema:
 *           type: object
 *           required:
 *             - to
 *             - subject
 *             - text
 *           properties:
 *             from:
 *               type: string
 *             to:
 *               type: string
 *             subject:
 *               type: string
 *             text:
 *               type: string
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       500:
 *         description: Failed to send the email
 */
router.post("/send-email", send);

export default router;
