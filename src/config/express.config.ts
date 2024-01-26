import { Express } from "express";
import * as bodyParser from "body-parser";
import { router } from "@routes/router";
import { ErrorHandler } from "@middlewares/error.handler.middleware";
import  cors from "cors";
import {NotFoundError} from "@error-custom/NotFoundError";
import * as swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerDefinition } from 'swaggerDef';
const swaggerDocument = require("../../swagger.json");

export class ExpressConfig {
  public app: Express;
  private port = Number(process.env.PORT) || 3000;
  private environment = process.env.NODE_ENV || 'development';

  constructor(express: Express) {
    this.app = express;
  }

  public async init(): Promise<void> {
    try {

      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: false }));
      this.app.use(cors());

      const options: swaggerJSDoc.Options = {
        definition: swaggerDefinition,
        apis: ['./src/routes/*.ts'],
      };

      const swaggerSpec = swaggerJSDoc(options);
      // this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



      this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


      this.app.use(router);

      this.app.use((req, res, next) => {
        next(new NotFoundError('Path Not Found. Please check your URL or Method'));
      });

      this.app.use(ErrorHandler);

      if(this.environment !== 'test') {
        this.app.listen(this.port, () => {
          console.log(`Server is running on port ${this.port}`);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
