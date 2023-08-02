import { Request, Response, NextFunction } from "express";
import { IPost } from "../models/Post";
import Post from "../models/Post";

class PostController {
  /**
   * @description getAllPosts - Async function to get all posts.
   *
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next function.
   *
   * @returns JSON response with a status and list of posts.
   */
  async getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const posts: IPost[] = await Post.find();

      let response = createResponse(
        201,
        true,
        "Received all posts successfully!",
        { posts }
      );
      return res.status(201).json({ response });
    } catch (error) {
      let response = createResponse(
        500,
        false,
        "Did not receive posts sucessfully!",
        {}
      );
      return res.status(500).json({ response });
    }
  }

  async getPostById(req: Request, res: Response, next: NextFunction) {
    try {
      const id: string = req.params.id;
      const post: IPost = await Post.findById(id);

      if (post) {
        let response = createResponse(
          200,
          true,
          "Received post successfully!",
          { post }
        );
        return res.status(200).json({ response });
      } else {
        let response = createResponse(404, false, "Post not found!", {});
        return res.status(404).json({ response });
      }
    } catch (error) {
      let response = createResponse(
        500,
        false,
        "Error occurred while retrieving the post!",
        {}
      );
      return res.status(500).json({ response });
    }
  }

  /**
   * @description createPost - Async function to create a post.
   *
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next function.
   *
   * @returns JSON response with a status and a new post.
   */
  async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      let post: IPost = new Post({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
      });

      const newPost = await post.save();

      let response = createResponse(
        201,
        true,
        "Created new post successfully!",
        {}
      );
      return res.status(201).json({ response });
    } catch (error) {
      let response = createResponse(
        500,
        false,
        "Did not create post sucessfully!",
        {}
      );
      return res.status(500).json({ response });
    }
  }

  /**
   * deleteUserById - Async function to delete a post by ID.
   *
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next function.
   *
   * @returns JSON response with a status and a message about deleted post.
   */
  async deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const removedUser = await Post.findByIdAndRemove(req.params.id);

      let response = createResponse(
        201,
        true,
        `Post with id ${req.params.id} deleted.`,
        {}
      );
      return res.status(201).json({ response });
    } catch (error) {
      let response = createResponse(
        500,
        false,
        `Post with id ${req.params.id} not deleted.`,
        {}
      );
      return res.status(500).json({ response });
    }
  }

  /**
   * updateUserById - Async function to update a post by ID.
   *
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {NextFunction} next - Express next function.
   *
   * @returns JSON response with a status and a message about updated post.
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      );

      if (updatedPost === null) {
        return res.status(404).json({ message: "Post not found." });
      }

      let response = createResponse(
        201,
        true,
        `Post with id ${req.params.id} updated.`,
        {}
      );
      return res.status(201).json({ response });
    } catch (error) {
      let response = createResponse(
        500,
        false,
        `Post with id ${req.params.id} not updated.`,
        {}
      );
      return res.status(500).json({ response });
    }
  }
}

function createResponse(
  statusCode: number,
  status: boolean,
  message: string,
  payload: any
): any {
  return {
    statusCode,
    status,
    message,
    payload,
  };
}

export default new PostController();
