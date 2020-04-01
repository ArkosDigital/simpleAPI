import pool from '../database/postgresDatabase';
import BaseDAO from './baseDAO';
import PersonDAOSimpleModel from '../models/person/personDAOSimpleModel';
import PersonDAOModel from '../models/person/personDAOModel';

class PersonDependantDAO extends BaseDAO {
  protected table = 'dependants';

  protected values = 'element.id, element.name, element.id_sponsor ';

  protected selectJoin = '';

  protected groupBy = ``;

  protected beforeInsert =
    'personInsert AS (INSERT INTO people (id) VALUES ($1) RETURNING id) ';

  protected insert = 'id, name, id_sponsor ';

  protected insertValues = '(SELECT id FROM personInsert), $2, $3 ';

  protected updateQuery = 'name = $2,  id_sponsor = $2';

  protected generateVectorValues(
    content: PersonDAOSimpleModel
  ): Promise<Array<unknown>> {
    let values;
    if (content.id) values = [content.id, content.name];
    else values = [content.name];
    return new Promise(resolve => resolve(values));
  }

  public selectById(id: string): Promise<PersonDAOModel> {
    return super.selectById(id) as Promise<PersonDAOModel>;
  }

  public selectAll(): Promise<Array<PersonDAOModel>> {
    return super.selectAll() as Promise<Array<PersonDAOModel>>;
  }

  public store(content: PersonDAOSimpleModel): Promise<PersonDAOModel> {
    return super.store(content) as Promise<PersonDAOModel>;
  }

  public update(
    id: string,
    content: PersonDAOSimpleModel
  ): Promise<PersonDAOModel> {
    return super.update(id, content) as Promise<PersonDAOModel>;
  }

  public delete(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM people WHERE id = $1', [id], (error, result) => {
        if (error) {
          return reject(error);
        }
        if (result.rowCount) {
          return resolve(true);
        }
        error = new Error();
        error.name = 'RemoveError';
        error.message = 'Unable to remove a non existent element.';
        return reject(error);
      });
    });
  }
}

export default new PersonDependantDAO();
