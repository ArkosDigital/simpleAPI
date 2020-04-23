import { BaseDAO, DAOSimpleModel, Journaly } from '../../source/index';
/* eslint-disable no-unused-vars */
export default class TestDAO extends BaseDAO {
  protected table = 'tests';

  protected values = 'element.ID ';

  protected insert = 'id';

  protected insertValues = '$1';

  protected updateQuery = '';

  constructor(pool, journaly: Journaly<any>) {
    super();
  }

  protected generateVectorValues(
    content: DAOSimpleModel
  ): Promise<Array<unknown>> {
    let values;
    if (content.id) values = [content.id];
    else values = [];
    return new Promise((resolve) => resolve(values));
  }
}