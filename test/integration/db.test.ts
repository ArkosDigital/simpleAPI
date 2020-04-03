import databasesHandler from './dBHandler';
import Utils from '../../source/utils';

test('populate db', async done => {
  try {
    await Utils.init(databasesHandler.getReadPool());
    await Utils.populate(databasesHandler.getReadPool());
  } catch (error) {
    await Utils.end(databasesHandler.getReadPool());
    expect(error).toBe(null);
    done();
  }
  await Utils.end(databasesHandler.getReadPool());
  done();
});
