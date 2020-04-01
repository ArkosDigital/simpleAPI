import Utils from '../../src/utils';
import IdentificationService from '../../src/services/identificationService';
import {
  googleIdentification,
  googleDAOIdentification,
} from './defaultElements';

test('store identification, update, select all, select by id identification and delete it', async done => {
  try {
    // Inicializa o banco de dados
    await Utils.init();

    // Create-Store Identification

    const createdIdentification = await IdentificationService.store(
      googleDAOIdentification
    );
    expect(createdIdentification).toStrictEqual({
      id: createdIdentification.id,
      ...googleDAOIdentification,
    });

    // Select by ID
    const identificationSelectedById = await IdentificationService.selectById(
      createdIdentification.id
    );
    const copyCreatedIdentification = { ...createdIdentification };
    expect(identificationSelectedById).toStrictEqual(copyCreatedIdentification);

    const identificationWithUnusedId = await IdentificationService.selectElementById(
      '3aebff3e9a9f462ca8de62bf'
    );
    expect(identificationWithUnusedId).toStrictEqual(undefined);

    // Select All Identifications
    const identificationSelectAll = await IdentificationService.selectAll();
    const resultIdentification = [{ ...copyCreatedIdentification }];
    expect(identificationSelectAll).toStrictEqual(resultIdentification);

    const identificationUpdated = await IdentificationService.updateElement(
      createdIdentification.id,
      googleIdentification
    );
    const contentUpdated = {
      id: createdIdentification.id,
      ...googleIdentification,
    };
    expect(identificationUpdated).toStrictEqual(contentUpdated);

    // Delete Identification
    const identificationDeleted = await IdentificationService.delete(
      createdIdentification.id
    );
    expect(identificationDeleted).toStrictEqual(true);
    const identificationDeletedSelectAll = await IdentificationService.selectAll();
    expect(identificationDeletedSelectAll).toStrictEqual([]);
  } catch (error) {
    console.error(error);
    await Utils.end();
    expect(error).toBe(null);
    done();
  }
  await Utils.end();
  done();
});
