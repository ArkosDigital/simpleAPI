/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Handler } from 'flexiblepersistence';
import ServiceAdapter from '../adapter/service/serviceAdapter';
// @ts-ignore
export default class DatabaseHandler {
  // @ts-ignore
  public abstract async migrate(): Promise<boolean>;
  // @ts-ignore
  protected abstract service: {
    [operation: string]: ServiceAdapter;
  };
  // @ts-ignore
  protected abstract eventHandler: Handler;
  // @ts-ignore
  protected abstract readPool: any;

  protected operation: {
    [operation: number]: string;
  } = {
    0: 'storeElement',
    2: 'updateElement',
    3: 'updateElement',
    4: 'deleteElement',
    5: 'deleteElement',
  };

  protected static _instance: DatabaseHandler;

  public getEventHandler(): Handler {
    return this.eventHandler;
  }

  public getReadPool(): any {
    return this.readPool;
  }

  public static getInstance(): DatabaseHandler {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }
}
