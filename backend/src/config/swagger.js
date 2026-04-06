import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "News App API",
      version: "1.0.0",
      description: "API documentation for the News App backend",
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT || 5000}`,
        },
    ],
    },
    apis: ["./src/routes/*.js","./src/index.js"], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;