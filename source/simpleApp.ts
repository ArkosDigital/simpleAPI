import express from 'express';
import cors from 'cors';

import RouterSingleton from './router/routerSingleton';
import { Journaly } from 'journaly';

export default class SimpleApp {
  public express: express.Application;
  public router;

  protected journaly: Journaly<any>;

  public constructor(router: RouterSingleton, journaly: Journaly<any>) {
    this.express = express();
    this.middlewares();
    this.router = router;
    this.journaly = journaly;
    this.routes(journaly);
  }

  protected middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  protected routes(journaly: Journaly<any>): void {
    this.router.createRoutes(journaly);
    this.express.use(this.router.getRoutes());
  }
}
