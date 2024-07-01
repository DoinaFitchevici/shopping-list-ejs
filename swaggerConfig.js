const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0", // Specify the OpenAPI version here
  info: {
    title: "Shopping List API", // Title of the API
    version: "1.0.0", // Version of the API
    description: "API documentation for the Shopping List application", // Description of the API
  },
  servers: [
    {
      url: "http://localhost:3001", // URL of the development server
      description: "Development server",
    },
  ],
  components: {
    schemas: {
      ShoppingCart: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "The unique identifier for the shopping cart",
          },
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                productId: {
                  type: "string",
                  description: "The ID of the product",
                },
                quantity: {
                  type: "integer",
                  description: "The quantity of the product",
                },
              },
            },
          },
          userId: {
            type: "string",
            description: "The ID of the user owning the cart",
          },
        },
        required: ["id", "items", "userId"],
      },
    },
  },
};

const options = {
  swaggerDefinition,
  // Path to the API docs
  apis: ["./routes/*.js"], // Files containing annotations as above
};

const swaggerSpecs = swaggerJSDoc(options);

module.exports = swaggerSpecs;
