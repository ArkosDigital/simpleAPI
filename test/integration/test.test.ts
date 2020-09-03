import { Utils } from '../../source/index';
// import dBHandler from './dBHandler';
import { Handler, Event, Operation } from 'flexiblepersistence';
import { ServiceHandler, ServiceInfo } from '@flexiblepersistence/service';
// import { PostgresInfo } from '@flexiblepersistence/postgres';
import eventDatabase from './eventDatabase';
import database from './database';
import { Journaly } from 'journaly';
import TestService from './testService';
import TestDAO from './testDAO';
import { Pool } from 'pg';

const pool = new Pool(database);

const journaly = new Journaly();
new TestService({
  journaly: journaly,
});
new TestDAO({
  pool: pool,
  journaly: journaly,
});
const read = new ServiceHandler(new ServiceInfo(database, journaly));
const handler = new Handler(eventDatabase, read);

class Test {
  public id: string | undefined;
}

test('store person, update, select all, select by id person and delete it', async (done) => {
  try {
    // Inicializa o banco de dados
    await Utils.init(pool);

    const createdPerson = (await handler.addEvent(
      new Event({ operation: Operation.create, content: new Test() })
    )[0]) as { id: string };
    console.log('createdPerson:' + createdPerson);
    const expectedPerson = {
      id: createdPerson.id,
    };
    expect(createdPerson).toStrictEqual({
      receivedItem: [],
      result: true,
      selectedItem: undefined,
      sentItem: expectedPerson,
    });
    // const all = (
    //   await journaly.publish('TestService.read')
    // )[0];

    // expect(all).toStrictEqual([expectedPerson]);
    // const one = (
    //   await journaly
    //     .publish('TestService.selectById', createdPerson.id)
    // )[0];

    // expect(one).toStrictEqual(expectedPerson);
  } catch (error) {
    console.error(error);
    await Utils.end(pool);
    expect(error).toBe(null);
    // done();
  }
  await Utils.end(pool);
  done();
});
