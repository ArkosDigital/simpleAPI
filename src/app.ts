import express from 'express';
import cors from 'cors';

import RouterSingleton from './routes';

export default class App {
  public express: express.Application;
  public router;

  public constructor(router: RouterSingleton) {
    this.express = express();
    this.middlewares();
    this.router = router;
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes(): void {
    this.router.createRoutes();
    this.express.use(this.router.getRoutes());
  }
}
