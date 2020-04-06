import TestUtils from './testUtils';

test('populate db', async (done) => {
  try {
    await TestUtils.init();
    await TestUtils.populate();
  } catch (error) {
    await TestUtils.end();
    expect(error).toBe(null);
    done();
  }
  await TestUtils.end();
  done();
});
