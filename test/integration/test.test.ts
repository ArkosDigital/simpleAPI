import { Utils } from '../../source/index';
// import dBHandler from './dBHandler';
import { Handler } from 'flexiblepersistence';
import { ServiceHandler, ServiceInfo } from '@flexiblepersistence/service';
import eventDatabase from './eventDatabase';
import database from './database';
import { Journaly } from 'journaly';
import TestService from './testService';
import { Pool } from 'pg';

let pool = new Pool(database);

const journaly = new Journaly();
new TestService({
  journaly: journaly,
});
let read = new ServiceHandler(new ServiceInfo(database, journaly));
const handler = new Handler(eventDatabase, read);

test('store person, update, select all, select by id person and delete it', async (done) => {
  try {
    // Inicializa o banco de dados
    await Utils.init(pool);

    const createdPerson = (
      await journaly.publish('TestService.create', {
        item: {}
      })
    )[0] as { id: string };
    console.log(createdPerson);
    const expectedPerson = {
      id: createdPerson.id,
    };
    expect(createdPerson).toStrictEqual(expectedPerson);
    const all = (
      await journaly.publish('TestService.read')
    )[0];

    expect(all).toStrictEqual([expectedPerson]);
    const one = (
      await journaly
        .publish('TestService.selectById', createdPerson.id)
    )[0];

    expect(one).toStrictEqual(expectedPerson);
  } catch (error) {
    console.error(error);
    await Utils.end(pool);
    expect(error).toBe(null);
    done();
  }
  await Utils.end(pool);
  done();
});
