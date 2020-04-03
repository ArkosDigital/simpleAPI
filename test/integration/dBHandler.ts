import { Handler } from 'flexiblepersistence';
import database from './database';
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

  public async migrate(): Promise<boolean> {
    try {
      const journaly = new Journaly(false);
      const testService = new TestService(
        this.getEventHandler(),
        journaly,
        new TestDAO(this.getReadPool())
      );
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
      const all = await testService.selectAll();
      if (!all || all.length < 1) {
        // testService.store({});
        journaly.publish('TestService.store', {});
      }
    } catch (error) {
      return new Promise((resolve, reject) => reject(error));
    }

    return new Promise(resolve => resolve(true));
  }
}

export default DBHandler.getInstance();
