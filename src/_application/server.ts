import express, { Router, json } from "express";
import { Environment } from "../_utils/environment";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import { Swagger } from "./swagger";
import swaggerJSDoc from "swagger-jsdoc";
import { setupRoutes } from "./routes/routes";

export default class Server {
  private readonly express: express.Application;
  private readonly port: string = Environment.port;
  private readonly routes: express.Router;

  constructor(routes: express.Router) {
    this.express = express();
    this.routes = routes;
    this.express.use("/docs", swaggerUi.serve, swaggerUi.setup(Swagger.spec));

    this.express.use(cors());
    this.express.use(json());
    this.express.use(this.routes);
  }

  public start = () => {
    const router = Router();
    this.express.use(setupRoutes(router));

    this.express.listen(this.port, () => {
      console.log(`Servidor rodando na porta ${Environment.port} 🏆`);
    });
  };
}
