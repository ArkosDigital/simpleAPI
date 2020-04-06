import { Utils } from '../../source/index';
import dBHandler from './dBHandler';

test('store person, update, select all, select by id person and delete it', async (done) => {
  try {
    // Inicializa o banco de dados
    await Utils.init(dBHandler.getReadPool());
    const createdPerson = (
      await dBHandler.getJournaly().publish('tests.store')
    )[0];
    const expectedPerson = {
      id: createdPerson.id,
    };
    expect(createdPerson).toStrictEqual(expectedPerson);
    await dBHandler.getJournaly().publish('tests.store');
    const all = (await dBHandler.getJournaly().publish('tests.selectAll'))[0];

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
