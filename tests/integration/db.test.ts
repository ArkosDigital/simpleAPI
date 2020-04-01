import Utils from '../../src/utils';

test('populate db', async done => {
  try {
    await Utils.init();
    await Utils.populate();
  } catch (error) {
    await Utils.end();
    expect(error).toBe(null);
    done();
  }
  await Utils.end();
  done();
});
