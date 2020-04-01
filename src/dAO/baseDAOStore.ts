/* eslint-disable @typescript-eslint/ban-ts-ignore */
import pool from '../database/postgresDatabase';
import DAOModel from '../models/dAOModel';
import DAOSimpleModel from '../models/dAOSimpleModel';
import DAOStoreAdapter from '../interfaces/dAO/dAOStoreAdapter';
import BaseDAORestrictedDefault from './baseDAORestrictedDefault';
// @ts-ignore
export default class BaseDAOStore extends BaseDAORestrictedDefault
  implements DAOStoreAdapter {
  // @ts-ignore
  protected abstract beforeInsert: string;
  // @ts-ignore
  protected abstract insert: string;
  // @ts-ignore
  protected abstract insertValues: string;

  protected async generateInsert(): Promise<string> {
    const insert = `INSERT INTO ${this.table} (${this.insert}) VALUES (${this.insertValues})`;
    return new Promise(resolve => {
      resolve(insert);
    });
  }

  public async store(content: DAOSimpleModel): Promise<DAOModel> {
    const values = await this.generateVectorValues(content);
    const select = await this.generateSelect('stored');
    const insert = await this.generateInsert();
    const query =
      `WITH ${this.beforeInsert ? this.beforeInsert : ''}${
        // eslint-disable-next-line no-nested-ternary
        this.beforeInsert && this.beforeInsert !== '' ? ',' : ''
      } stored AS (${insert} ` +
      `RETURNING *` +
      `) ${select} ${this.groupBy}`;
    return new Promise((resolve, reject) => {
      pool.query(query, values, (error, result) => {
        if (error) {
          return reject(error);
        }
        result = this.fixType(result);
        return resolve(result.rows[0]);
      });
    });
  }
}
