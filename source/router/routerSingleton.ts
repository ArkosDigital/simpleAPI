import { Router } from 'express';
import { Journaly } from 'journaly';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default class RouterSingleton {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  public abstract createRoutes(journaly: Journaly<any>): void;
  protected static _instance: RouterSingleton;

  protected routes: Router;

  protected constructor() {
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
