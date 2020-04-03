import { Utils, Journaly } from '../../source/index';
import dBHandler from './dBHandler';
import TestService from './testService';
import TestDAO from './testDAO';

const journaly = new Journaly(false);

const testService = new TestService(
  dBHandler.getEventHandler(),
  journaly,
  new TestDAO(dBHandler.getReadPool())
);

test('store person, update, select all, select by id person and delete it', async done => {
  try {
    // Inicializa o banco de dados
    await Utils.init(dBHandler.getReadPool());
    const createdPerson = await testService.store({});
    const expectedPerson = {
      id: createdPerson.id,
    };
    expect(createdPerson).toStrictEqual(expectedPerson);
    journaly.publish('TestService.store', {});
    const all = await testService.selectAll();

    expect(all).toStrictEqual([expectedPerson]);
  } catch (error) {
    console.error(error);
    await Utils.end(dBHandler.getReadPool());
    expect(error).toBe(null);
    done();
  }
  await Utils.end(dBHandler.getReadPool());
  done();
});
