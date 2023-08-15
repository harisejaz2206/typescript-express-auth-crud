import { NextFunction, Request, Response } from "express";
import Joi from "joi";

/**
 * This function is a middleware that validates the request body when creating a post.
 *
 * @param {Request} req - Express request object. The request body should contain a title, body, and author.
 * @param {Response} res - Express response object. Used to send the response to the client.
 * @param {NextFunction} next - Function to call the next middleware.
 *
 * @throws {Error} Will throw an error if the validation fails.
 *
 * @returns {void}
 */
export const createPostValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const schema = Joi.object({
      title: Joi.string().min(3).max(30).required(),
      body: Joi.string().min(3).max(30).required(),
    });

    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    console.log(err);

    let errors: Record<string, string> = {};

    if (err && err.details) {
      err.details.forEach((el: any) => {
        errors[el.context.key] = el.message.replace(/"/g, "");
      });
    }

    res.status(400).json({ errors });
    return;
  }
};
