import express from 'express';
import cors from 'cors';

import RouterSingleton from './router/routerSingleton';

export default class SimpleApp {
  public express: express.Application;
  public router;

  public constructor(router: RouterSingleton) {
    this.express = express();
    this.middlewares();
    this.router = router;
    this.routes();
  }

  protected middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  protected routes(): void {
    this.router.createRoutes();
    this.express.use(this.router.getRoutes());
  }
}
