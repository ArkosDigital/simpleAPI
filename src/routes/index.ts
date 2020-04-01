import { Router } from 'express';
class RouterSingleton {
  private static _instance: RouterSingleton;

  private routes: Router;

  private constructor() {
    this.routes = Router();
  }

  public static getInstance(): RouterSingleton {
    if (!this._instance) {
      this._instance = new RouterSingleton();
    }
    return this._instance;
  }

  public getRoutes(): Router {
    return this.routes;
  }

  public createRoutes(): void {
    // const routes = RouterSingleton.getInstance().getRoutes();
    // SessionRouter(routes); // Always first
    // RegisterDependantRouter(routes);
    // RegisterUserRouter(routes);
    // routes.use(SessionController.auth.bind(SessionController));
    // SystemRouter(routes);
    // PersonUserRouter(routes);
    // PersonDependantRouter(routes);
  }
}

export default RouterSingleton;
