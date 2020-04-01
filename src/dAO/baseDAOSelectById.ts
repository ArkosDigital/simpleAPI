import DAOModel from '../models/dAOModel';
import DAOSelectByIdAdapter from '../interfaces/dAO/dAOSelectByIdAdapter';
import BaseDAODefault from './baseDAODefault';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default class BaseDAOSelectById extends BaseDAODefault
  implements DAOSelectByIdAdapter {
  public async selectById(id: string): Promise<DAOModel> {
    const select = await this.generateSelect(this.table);
    return new Promise((resolve, reject) => {
      this.pool.query(
        `${select} WHERE element.id = $1 ${this.groupBy}`,
        [id],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          result = this.fixType(result);
          return resolve(result.rows[0]);
        }
      );
    });
  }
}
