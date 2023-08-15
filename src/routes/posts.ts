import express from "express";
import postController from "../controller/post.controller";
import { createPostValidation } from "../validation/post";

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:            # Arbitrary name for the security scheme
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT    # Optional, arbitrary value for documentation purposes
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         body:
 *           type: string
 *         author:
 *           type: string
 *           format: uuid
 *           description: User ID
 *
 * /posts:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns the list of all the posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: The list of the posts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 * /posts/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get the post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: The post description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Remove the post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: The post was deleted
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update the post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The post was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */

// Post Routes

// GET: Retrieve all users from the database
// This route will call the getAllUsers function in the user controller
router.get("/", postController.getAllPosts);

// GET: Retrieve a specific user by their ID
// This route will call the getUserById function in the user controller
router.get("/:id", postController.getPostById);

// POST: Create a new user
// This route will call the createUser function in the user controller
router.post("/", createPostValidation, postController.create);

// PATCH: Update specific fields of a user by their ID
// This route will call the updateUserById function in the user controller
router.put("/:id", createPostValidation, postController.update);

// DELETE: Remove a specific user by their ID
// This route will call the deleteUserById function in the user controller
router.delete("/:id", postController.deletePostById);

export default router;
