import swaggerJSDoc from "swagger-jsdoc";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: 'Lingo API',
            version: '1.0.0',
            description: 'A way to get your duolingo working!',
        },
    },
    apis: ['./src/**/*.ts']
};

const swaggerSpec = swaggerJSDoc(options);
export { swaggerSpec };

