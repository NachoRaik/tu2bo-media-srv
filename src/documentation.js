exports.options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Media Server",
        version: "1.0.0",
        description: "Media Server for TutuboApp",
      },
      servers: [
        {
          url: "http://localhost:3000/"
        }
      ]
    },
    apis: []
  };