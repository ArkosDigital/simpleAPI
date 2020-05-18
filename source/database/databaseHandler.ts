/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Handler } from 'flexiblepersistence';
import ServiceAdapter from '../adapter/service/serviceAdapter';
import DAOAdapter from '../adapter/dAO/dAOAdapter';
import { Journaly } from 'journaly';
// @ts-ignore
export default class DatabaseHandler {
  // @ts-ignore
  protected journaly: Journaly<any>;

  public getJournaly(): Journaly<any> {
    return this.journaly;
  }
  // @ts-ignore
  public abstract async migrate(): Promise<boolean>;
  // @ts-ignore
  public service: {
    [name: string]: ServiceAdapter;
  } = {
    // test: exampleService,
  };

  public dAO: {
    [name: string]: DAOAdapter;
  } = {
    // test: exampleDAO
  };
  // @ts-ignore
  protected eventHandler: Handler;
  // @ts-ignore
  protected readPool: any;

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

  protected constructor(hasMemory?: boolean) {
    this.journaly = new Journaly<any>(hasMemory);
  }

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
