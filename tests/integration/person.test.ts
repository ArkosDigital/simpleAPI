import Utils from '../../src/utils';
// import PersonDependantService from '../../src/services/personDependantService';
import PersonUserService from '../../src/services/personUserService';
import { Max, betDAO, Xam } from './defaultElements';
import SystemDAO from '../../src/dAO/systemDAO';

test('store person, update, select all, select by id person and delete it', async done => {
  try {
    // Inicializa o banco de dados
    await Utils.init();

    await SystemDAO.store(betDAO);

    const createdPerson = await PersonUserService.store(Max);
    const expectedPerson = {
      id: createdPerson.id,
      sponsor: undefined,
      ...Max,
    };
    expectedPerson.identifications[0].id = createdPerson.identifications[0].id;
    expectedPerson.permissions[0].id = createdPerson.permissions[0].id;
    expectedPerson.permissions[0].system = betDAO;
    expect(createdPerson).toStrictEqual(expectedPerson);

    // Select by ID
    const personSelectedById = await PersonUserService.selectById(
      createdPerson.id
    );
    const copyCreatedPerson = { ...createdPerson };
    expect(personSelectedById).toStrictEqual(copyCreatedPerson);

    const personWithUnusedId = await PersonUserService.selectElementById(
      '3aebff3e9a9f462ca8de62bf'
    );
    expect(personWithUnusedId).toStrictEqual(undefined);
    console.log('E2');

    // Select All Persons
    const personSelectAll = await PersonUserService.selectAll();
    const resultPerson = [{ ...copyCreatedPerson }];
    expect(personSelectAll).toStrictEqual(resultPerson);

    console.log('E3');

    const personUpdated = await PersonUserService.updateElement(
      createdPerson.id,
      Xam
    );
    const contentUpdated = {
      id: createdPerson.id,
      ...Xam,
      sponsor: undefined,
    };
    contentUpdated.identifications[0].id = personUpdated.identifications[0].id;
    contentUpdated.permissions[0].id = personUpdated.permissions[0].id;
    contentUpdated.permissions[0].system = betDAO;
    expect(personUpdated).toStrictEqual(contentUpdated);
    console.log('E3');

    // Delete Person
    const personDeleted = await PersonUserService.delete(createdPerson.id);
    expect(personDeleted).toStrictEqual(true);
    const personDeletedSelectAll = await PersonUserService.selectAll();
    expect(personDeletedSelectAll).toStrictEqual([]);
    console.log('E4');
  } catch (error) {
    console.error(error);
    await Utils.end();
    expect(error).toBe(null);
    done();
  }
  await Utils.end();
  done();
});
