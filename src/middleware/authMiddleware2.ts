import jwt, { VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/User";

interface RequestWithUser extends Request {
  user?: IUser;
}

function authenticateToken(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const token: string | undefined = req.cookies["token"];
  if (token == null) {
    console.log("Token is null");
    return res.json({
      statusCode: 401,
      message: "Authenticated User",
      status: false,
    });
  } else {
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string,
      (err: VerifyErrors | null, user: IUser | undefined) => {
        if (err) {
          console.log("There is error in verifying token", err);
          return res.sendStatus(401).json({
            statusCode: 401,
            message: "Authenticated User",
            status: false,
          });
        }

        req.user = user;

        next();
      }
    );
  }
}

export default authenticateToken;
