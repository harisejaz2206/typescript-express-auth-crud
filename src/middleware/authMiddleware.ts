// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// interface RequestWithUser extends Request {
//   user: any
// }

// const verifyToken = (req: RequestWithUser, res: Response, next: NextFunction) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//         return res.status(403).json({ message: 'A token is required for authentication' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         req.user = decoded;
//     } catch (err) {
//         return res.status(401).json({ message: 'Invalid Token' });
//     }
//     return next();
// };

// export default verifyToken;

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
  const authHeader: string | undefined = req.headers["authorization"];
  const token: string | undefined = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: VerifyErrors | null, user: IUser | undefined) => {
      console.log(err);

      if (err) return res.sendStatus(403);

      req.user = user;

      next();
    }
  );
}

export default authenticateToken;
