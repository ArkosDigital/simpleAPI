/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable @typescript-eslint/no-explicit-any */
import database from './database';
import { Handler } from 'flexiblepersistence';
import eventDatabase from './eventDatabase';
import { DatabaseHandler, Utils, Pool } from '../../source/index';
import TestService from './testService';
import TestDAO from './testDAO';

// TODO: ADD: Services
const postgres = new Pool(database);
const handler = new Handler(eventDatabase);

class DBHandler extends DatabaseHandler {
  protected initDAO(): void {
    // @ts-ignore
    this.dAO['test'] = new TestDAO({
      pool: this.getReadPool(),
      journaly: this.journaly,
    });
  }
  protected initService(): void {
    // @ts-ignore
    this.service['test'] = new TestService({
      journaly: this.journaly,
    });
  }

  // public async migrate(): Promise<boolean> {
  //   try {
  //     const events = await this.eventHandler.readArray('events', {});
  //     await Utils.dropTables(this.getReadPool());
  //     await Utils.init(this.getReadPool());
  //     for (const event of events.receivedItem) {
  //       if (this.service[event.name] && this.operation[event.operation]) {
  //         const service = this.service[event.name];
  //         const operation = this.operation[event.operation];
  //         if (
  //           event.content &&
  //           event._id &&
  //           (!event.selection || (event.selection && !event.selection._id))
  //         ) {
  //           event.content.id = event._id.toString();
  //         }
  //         if (event.selection && event.selection._id && event.content) {
  //           await service[operation](event.selection._id, event.content);
  //         } else if (event.content) {
  //           await service[operation](event.content);
  //         } else if (event.selection && event.selection._id) {
  //           await service[operation](event.selection._id);
  //         }
  //       }
  //     }
  //     const all = await this.journaly.publish('TestService.selectAll')[0];
  //     if (!all || all.length < 1) {
  //       await this.journaly.publish('TestService.store', {});
  //     }
  //   } catch (error) {
  //     return new Promise((resolve, reject) => reject(error));
  //   }

  //   return new Promise((resolve) => resolve(true));
  // }
}

export default DBHandler.getInstance({
  eventHandler: handler,
  readPool: postgres,
  hasMemory: false,
}) as DBHandler;
