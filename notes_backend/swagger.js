const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NoteFlow Express API',
      version: '1.0.0',
      description: 'A note-taking API providing CRUD operations and organization for notes, documented with Swagger.',
    }
  },
  apis: ['./src/routes/*.js'], // Path to the API docs, includes notes.js
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
