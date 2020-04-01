/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import pool from '../database/postgresDatabase';
import DAOModel from '../models/dAOModel';
import BaseDAODefault from './baseDAODefault';
import DAOSelectAllAdapter from '../interfaces/dAO/dAOSelectAllAdapter';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default class BaseDAOSelectAll extends BaseDAODefault
  implements DAOSelectAllAdapter {
  public async selectAll(): Promise<Array<DAOModel>> {
    const select = await this.generateSelect(this.table);
    return new Promise((resolve, reject) => {
      pool.query(`${select} ${this.groupBy}`, (error, result) => {
        if (error) {
          return reject(error);
        }
        result = this.fixType(result);
        return resolve(result.rows);
      });
    });
  }
}
