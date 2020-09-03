/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Handler } from 'flexiblepersistence';
import { Journaly } from 'journaly';
import { DatabaseInitializer, DAOAdapter } from '@flexiblepersistence/postgres';
import { PersistenceAdapter } from 'flexiblepersistence';
// @ts-ignore
export default abstract class DatabaseHandler {
  // @ts-ignore
  protected journaly: Journaly<any>;

  public getJournaly(): Journaly<any> {
    return this.journaly;
  }
  public service: {
    [name: string]: PersistenceAdapter;
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

  protected constructor(init?: DatabaseInitializer) {
    if (init) {
      this.journaly = new Journaly<any>(init.hasMemory);
      if (init.eventHandler) this.eventHandler = init.eventHandler;
      if (init.readPool) this.readPool = init.readPool;
      this.initDAO();
      this.initService();
    }
  }
  protected abstract initDAO(): void;
  protected abstract initService(): void;

  public getEventHandler(): Handler {
    return this.eventHandler;
  }

  public getReadPool(): any {
    return this.readPool;
  }

  public static getInstance(init?: DatabaseInitializer): DatabaseHandler {
    if (!this._instance) {
      // @ts-ignore
      this._instance = new this(init);
    }
    return this._instance;
  }
}
