import Utils from '../../src/utils';
import handler from '../../src/database/handler';
import databasesHandler from '../../src/databasesHandler';

test('With Migration store identification, update, select all, select by id identification and delete it', async done => {
  try {
    // Inicializa o banco de dados
    //TODO
    await Utils.init();
    await handler.getWrite().clear('events');

    const migration = await databasesHandler.migrate();
    expect(migration).toBe(true);

    const migration2 = await databasesHandler.migrate();
    expect(migration2).toBe(true);

    const migration3 = await databasesHandler.migrate();
    expect(migration3).toBe(true);
  } catch (error) {
    console.error(error);
    await handler.getWrite().clear('events');
    await Utils.end();
    expect(error).toBe(null);
    done();
  }
  await handler.getWrite().clear('events');
  await Utils.end();
  done();
});
