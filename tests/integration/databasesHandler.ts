import database from './database';
import eventDatabase from './eventDatabase';
import {
  DatabaseHandler,
  ServiceAdapter,
  Utils,
  Pool,
  Handler,
} from '../../source/index';

// TODO: ADD: Services
const postgres = new Pool(database);
const handler = new Handler(eventDatabase);
class DatabasesHandler extends DatabaseHandler {
  protected eventHandler = handler;
  protected readPool = postgres;
  protected service: {
    [operation: string]: ServiceAdapter;
  } = {
    // example: exampleService,
  };

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
    } catch (error) {
      return new Promise((resolve, reject) => reject(error));
    }

    return new Promise(resolve => resolve(true));
  }
}

export default DatabasesHandler.getInstance();
