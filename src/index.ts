import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

// Importing Routes
import authRoute from "./routes/auth";
import postRoute from "./routes/posts";
import authenticateToken from "./middleware/authMiddleware";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hello Renesis",
      version: "1.0.0",
      description: "A simple Express API",
    },
    servers: [
      {
        // url: `http://localhost:${process.env.PORT}/api/v1`,
        url: `http://localhost:8081/api/v1`,
      },
    ],
  },
  // Path to the API docs
  // Note: If you use structure like /routes/*.ts,
  // make sure you set "include" option in tsconfig.json as ["./src/**/*"]
  // apis: ["../src/routes/*.ts"],
  // apis: ["/src/routes/*.ts"],
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(swaggerOptions);

const router = express.Router();
const app = express();

dotenv.config();

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies in the request

app.use(cors());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
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

export default app;
