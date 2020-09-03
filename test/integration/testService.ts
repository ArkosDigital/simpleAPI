/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {
  ServiceModel,
  ServiceSimpleModel,
  BaseServiceDefault,
} from '@flexiblepersistence/service';
import {
  PersistenceAdapter,
  PersistenceInputCreate,
  PersistencePromise,
  PersistenceInputDelete,
  PersistenceInputUpdate,
  PersistenceInputRead,
} from 'flexiblepersistence';
export default class TestService
  extends BaseServiceDefault
  implements PersistenceAdapter {
  async close(): Promise<boolean> {
    return await new Promise<boolean>(async (resolve) => {
      resolve(true);
    });
  }
  getDatabaseInfo() {
    throw new Error('Method not implemented.');
  }
  async create(
    input: PersistenceInputCreate | {}
  ): Promise<PersistencePromise> {
    return await new Promise<PersistencePromise>(async (resolve, reject) => {
      const type = 'store';
      let received;
      input['item'].id = input['id'];
      console.log('RECEIVED INPUT: ', input);

      try {
        received = await this.dAO(type, 'item' in input ? input.item : input);
      } catch (error) {
        reject(error);
      }

      console.log('received:', received);

      resolve(
        new PersistencePromise({
          receivedItem: received,
          result: true,
          sentItem: 'item' in input ? input.item : input,
        })
      );
    });
  }
  nonexistent(
    input: PersistenceInputDelete | string
  ): Promise<PersistencePromise> {
    return this.delete(input);
  }
  delete(input: PersistenceInputDelete | string): Promise<PersistencePromise> {
    return new Promise<PersistencePromise>(async (resolve, reject) => {
      const type = 'delete';
      let received;
      try {
        // if (type === 'selectById')
        received = await this.dAO(
          type,
          typeof input === 'string' ? input : input.id
        );
        // else received = await this.dAO(type);
      } catch (error) {
        reject(error);
      }

      resolve(
        new PersistencePromise({
          receivedItem:
            typeof input === 'string'
              ? received[0]
              : input.single
              ? received[0]
              : received,
          result: true,
          selectedItem: typeof input === 'string' ? input : input.id,
        })
      );
    });
  }
  correct(input: PersistenceInputUpdate): Promise<PersistencePromise> {
    return this.correct(input);
  }
  update(input: PersistenceInputUpdate): Promise<PersistencePromise> {
    return new Promise<PersistencePromise>(async (resolve, reject) => {
      const type = 'update';
      let received;
      try {
        received = await this.dAO(type, input.id, input.item);
      } catch (error) {
        reject(error);
      }
      resolve(
        new PersistencePromise({
          receivedItem: input.single ? received[0] : received,
          result: true,
          selectedItem: input.id,
          sentItem: input.item,
        })
      );
    });
  }
  read(input: PersistenceInputRead | string): Promise<PersistencePromise> {
    return new Promise<PersistencePromise>(async (resolve, reject) => {
      const type: string =
        typeof input === 'string' || input.id ? 'selectById' : 'selectAll';
      let received;
      try {
        if (type === 'selectById')
          received = await this.dAO(
            type,
            typeof input === 'string' ? input : input.id
          );
        else received = await this.dAO(type);
      } catch (error) {
        reject(error);
      }

      resolve(
        new PersistencePromise({
          receivedItem:
            typeof input === 'string'
              ? received[0]
              : input.single
              ? received[0]
              : received,
          result: true,
          selectedItem: typeof input === 'string' ? input : input.id,
        })
      );
    });
  }
}
