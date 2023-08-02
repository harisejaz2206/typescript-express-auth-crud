import express from "express";
import postController from "../controller/post.controller";

const router = express.Router();

// Post Routes

// GET: Retrieve all users from the database
// This route will call the getAllUsers function in the user controller
router.get("/", postController.getAllPosts);

// GET: Retrieve a specific user by their ID
// This route will call the getUserById function in the user controller
router.get("/:id", postController.getPostById);

// POST: Create a new user
// This route will call the createUser function in the user controller
router.post("/", postController.createPost);

// PATCH: Update specific fields of a user by their ID
// This route will call the updateUserById function in the user controller
router.put("/:id", postController.update);

// DELETE: Remove a specific user by their ID
// This route will call the deleteUserById function in the user controller
router.delete("/:id", postController.deleteUserById);

export default router;
