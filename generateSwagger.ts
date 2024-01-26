import swaggerJSDoc from 'swagger-jsdoc';
import fs from 'fs';
import { swaggerDefinition } from './src/swaggerDef'; // Adjust the path as necessary

const options: swaggerJSDoc.Options = {
    definition: swaggerDefinition,
    apis: ['./src/routes/*.ts'], // Adjust this if necessary
};

const swaggerSpec = swaggerJSDoc(options);

fs.writeFile('./swagger.json', JSON.stringify(swaggerSpec, null, 2), (err) => {
    if (err) {
        console.error('Error writing Swagger JSON file:', err);
        return;
    }
    console.log('Swagger JSON file has been saved.');
});
