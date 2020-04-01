import { Router } from 'express';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default class RouterSingleton {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  public abstract createRoutes(): void;
  private static _instance: RouterSingleton;

  private routes: Router;

  private constructor() {
    this.routes = Router();
  }

  public static getInstance(): RouterSingleton {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  public getRoutes(): Router {
    return this.routes;
  }
}
