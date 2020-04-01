import Utils from '../../src/utils';

test('create, populate and drop database', async done => {
  try {
    await Utils.init();
    await Utils.populate();
    await Utils.dropTables();
  } catch (error) {
    await Utils.end();
    expect(error).toBe(null);
    done();
  }
  await Utils.end();
  done();
});
