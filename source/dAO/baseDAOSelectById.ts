import DAOModel from '../model/dAOModel';
import DAOSelectByIdAdapter from '../adapter/dAO/dAOSelectByIdAdapter';
import BaseDAODefault from './baseDAODefault';
import { Journaly } from 'journaly';
import { settings } from 'ts-mixer';
settings.initFunction = 'init';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default class BaseDAOSelectById extends BaseDAODefault
  implements DAOSelectByIdAdapter {
  protected init(pool, journaly: Journaly<any>): void {
    super.init(pool, journaly);
    // this.journaly.subscribe(this.element + '.' + 'selectById', this.selectById);
  }
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
