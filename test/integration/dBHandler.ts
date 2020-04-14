/* eslint-disable @typescript-eslint/no-explicit-any */
import database from './database';
import { Handler } from 'flexiblepersistence';
import eventDatabase from './eventDatabase';
import {
  DatabaseHandler,
  Utils,
  Pool,
  ServiceAdapter,
  Journaly,
} from '../../source/index';
import TestService from './testService';
import TestDAO from './testDAO';

// TODO: ADD: Services
const postgres = new Pool(database);
const handler = new Handler(eventDatabase);

class DBHandler extends DatabaseHandler {
  protected eventHandler = handler;
  protected readPool = postgres;
  protected service: {
    [operation: string]: ServiceAdapter;
  } = {
    // example: exampleService,
  };

  protected journaly: Journaly<any>;

  public getJournaly(): Journaly<any> {
    return this.journaly;
  }

  protected constructor() {
    super();
    this.journaly = new Journaly<any>(false);
    this.testDAO = new TestDAO(this.getReadPool());
    this.testService = new TestService(
      this.getEventHandler(),
      this.journaly,
      this.testDAO
    );
  }
  protected testDAO: TestDAO;
  public getTestDAO(): TestDAO {
    return this.testDAO;
  }
  protected testService: TestService;
  public getTestService(): TestService {
    return this.testService;
  }

  public async migrate(): Promise<boolean> {
    try {
      const events = await this.eventHandler.readArray('events', {});
      await Utils.dropTables(this.getReadPool());
      await Utils.init(this.getReadPool());
      for (const event of events.receivedItem) {
        if (this.service[event.name] && this.operation[event.operation]) {
          const service = this.service[event.name];
          const operation = this.operation[event.operation];
          if (
            event.content &&
            event._id &&
            (!event.selection || (event.selection && !event.selection._id))
          ) {
            event.content.id = event._id.toString();
          }
          if (event.selection && event.selection._id && event.content) {
            await service[operation](event.selection._id, event.content);
          } else if (event.content) {
            await service[operation](event.content);
          } else if (event.selection && event.selection._id) {
            await service[operation](event.selection._id);
          }
        }
      }
      const all = await this.journaly.publish('tests.selectAll')[0];
      if (!all || all.length < 1) {
        await this.journaly.publish('tests.store', {});
      }
    } catch (error) {
      return new Promise((resolve, reject) => reject(error));
    }

    return new Promise((resolve) => resolve(true));
  }
}

export default DBHandler.getInstance() as DBHandler;
