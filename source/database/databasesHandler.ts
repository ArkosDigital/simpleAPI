import { Handler } from 'flexiblepersistence';
import ServiceAdapter from '../interfaces/service/serviceAdapter';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default class DatabasesHandler {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  public abstract async migrate(): Promise<boolean>;
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  protected abstract service: {
    [operation: string]: ServiceAdapter;
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  private abstract eventHandler: Handler;

  protected operation: {
    [operation: number]: string;
  } = {
    0: 'storeElement',
    2: 'updateElement',
    3: 'updateElement',
    4: 'deleteElement',
    5: 'deleteElement',
  };

  private static _instance: DatabasesHandler;

  public static getInstance(): DatabasesHandler {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }
}
