import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/User";
import { IResponse } from "interface/response.interface";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  /**
   * register - Async function to register a new user.
   *
   * @param {Request} req - Express request object, should include username, email, and password in the body.
   * @param {Response} res - Express response object used to send the response to the client.
   * @param {NextFunction} next - Express next function.
   *
   * @returns {Promise<Response>} JSON response with a status and a message about registration status.
   */
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IResponse>> {
    const { username, email, password } = req.body;
    try {
      let user: IUser = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      user = await User.create({
        username,
        email,
        password,
      });

      // Generate JWT token after registration
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      // const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
      //   expiresIn: "1h",
      // });

      return res.status(201).json({
        statusCode: 201,
        status: true,
        message: "User registered successfully",
        payload: token,
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

  /**
   * login - Async function to log a user in.
   *
   * @param {Request} req - Express request object, should include email and password in the body.
   * @param {Response} res - Express response object used to send the response to the client.
   * @param {NextFunction} next - Express next function.
   *
   * @returns {Promise<Response>} JSON response with a status and a message about login status.
   */
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const user: IUser = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User doesn't exist" });
      }

      // Use bcrypt.compare to check password
      const isMatch = await bcrypt.compare(password, user.password.toString());

      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });

      res
        .status(200)
        .json({ message: "Logged in successfully", payload: { token } });
    } catch (error) {
      console.log("The error is: ", error.message);
      res.status(500).json({ message: "Server Error" });
    }
  }
}

export default new AuthController();
