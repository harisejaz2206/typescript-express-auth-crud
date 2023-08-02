// Import packages
import express from "express";
const router = express.Router();
// Importing the controller
import authContoller from "../controller/auth.controller";

// Auth Routes

// POST: Register a new user into the database
// This route will call the register function in the user controller
router.post("/register", authContoller.register);

// POST: Login a user
// This route will call the login function in the user controller
router.post("/login", authContoller.login);

export default router;
