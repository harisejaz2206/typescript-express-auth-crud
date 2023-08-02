import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Importing Routes
import authRoute from "./routes/auth";
import postRoute from "./routes/posts";
import authenticateToken from "./middleware/authMiddleware";

const router = express.Router();
const app = express();

dotenv.config();

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies in the request

app.use(
  cors({
    credentials: true,
  })
);

// Create the HTTP server using app as the request handler
const server = http.createServer(app);

// Define the port on which the server will listen
const port = process.env.PORT;

// Start the server
const protocol = "http"; // Change this to 'https' if using HTTPS

const MONGO_URL = process.env.MONGO_URL;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);

mongoose.connection.on("error", (error: Error) => {
  console.error("Mongoose encountered an error:", error);
});

mongoose.connection.once("open", () => {
  console.log("Mongoose is successfully connected to MongoDB");
});

// Address for REST API
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/posts", authenticateToken, postRoute);

server.listen(port, () => {
  console.log(`Server is running on ${protocol}://localhost:${port}`);
});
