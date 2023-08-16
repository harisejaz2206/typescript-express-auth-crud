import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/User";
import { IResponse } from "interface/response.interface";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { send } from "./email.controller";

class AuthController2 {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IResponse>> {
    const { username, email, password } = req.body;
    console.log("inside", req.body);
    try {
      let user: IUser = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          statusCode: 400,
          status: false,
          message: "User already exists!",
          payload: { user },
        });
      }
      user = await User.create({
        username,
        email,
        password,
      });
      send({ from: "", to: "", subject: "", text: "" });

      const tokenPayload = { id: user._id, email: user.email }; // plain JS object
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      });

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: Number(process.env.JWT_EXPIRATION_TIME) * 1000, // Convert to milliseconds
      });

      return res.status(201).json({
        statusCode: 201,
        status: true,
        message: "User registered successfully",
      });
    } catch (error) {
      console.log("The error is: ", error);
      res.status(500).json({
        statusCode: 500,
        status: false,
        message: "User not registered",
      });
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    console.log("inside the login api. The request.body: ", req.body);
    const { email, password } = req.body;

    try {
      const user: IUser = await User.findOne({ email: email });
      console.log("The username is: ", user.username);
      console.log("The email is: ", user.email);
      console.log("Email from request:", email);
      if (!user) {
        return res.status(200).json({
          statusCode: 200,
          status: false,
          message: "User doesn't exist",
        });
      }
      console.log("Status code 200. Now we will compare password");

      const isMatch = await bcrypt.compare(password, user.password.toString());
      console.log("Password is matched");

      if (!isMatch) {
        console.log("Password didnt match sorry");
        return res.status(400).json({
          statusCode: 400,
          status: false,
          message: "Incorrect Password",
        });
      }

      const tokenPayload = { id: user._id, email: user.email }; // plain JS object
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      });

      const userResponse = {
        username: user.username,
        email: user.email,
      };
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: Number(process.env.JWT_EXPIRATION_TIME) * 1000, // Convert to milliseconds
      });
      res.status(200).json({
        message: "Logged in successfully",
        payload: { user: userResponse },
      });
      console.log("You have logged in with the email:", email);
    } catch (error) {
      console.log("The error is: ", error.message);
      return res.status(500).json({
        statusCode: 500,
        status: false,
        message: "Server Error",
      });
    }
  }
}

export default new AuthController2();
