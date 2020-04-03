import { BaseDAO, DAOSimpleModel } from '../../source/index';

export default class TestDAO extends BaseDAO {
  protected table = 'tests';

  protected values = 'element.ID ';

  protected insert = 'id';

  protected insertValues = '$1';

  protected updateQuery = '';

  protected generateVectorValues(
    content: DAOSimpleModel
  ): Promise<Array<unknown>> {
    let values;
    if (content.id) values = [content.id];
    else values = [];
    return new Promise(resolve => resolve(values));
  }
}
