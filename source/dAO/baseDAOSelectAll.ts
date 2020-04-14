/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import DAOModel from '../model/dAOModel';
import BaseDAODefault from './baseDAODefault';
import DAOSelectAllAdapter from '../adapter/dAO/dAOSelectAllAdapter';
import { Journaly } from 'journaly';
import { settings } from 'ts-mixer';
settings.initFunction = 'init';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default class BaseDAOSelectAll extends BaseDAODefault
  implements DAOSelectAllAdapter {
  protected init(pool, journaly: Journaly<any>): void {
    super.init(pool, journaly);
    // this.journaly.subscribe(this.element + '.' + 'selectAll', this.selectAll);
  }
  public async selectAll(): Promise<Array<DAOModel>> {
    const select = await this.generateSelect(this.table);
    return new Promise((resolve, reject) => {
      this.pool.query(`${select} ${this.groupBy}`, (error, result) => {
        if (error) {
          return reject(error);
        }
        result = this.fixType(result);
        return resolve(result.rows);
      });
    });
  }
}
