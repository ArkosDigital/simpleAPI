import DAOModel from '../model/dAOModel';
import DAOSimpleModel from '../model/dAOSimpleModel';
import DAOUpdateAdapter from '../adapter/dAO/dAOUpdateAdapter';
import BaseDAORestrictedDefault from './baseDAORestrictedDefault';
import { Journaly } from 'journaly';
import { settings } from 'ts-mixer';
settings.initFunction = 'init';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default class BaseDAOUpdate extends BaseDAORestrictedDefault
  implements DAOUpdateAdapter {
  protected init(pool, journaly: Journaly<any>): void {
    super.init(pool, journaly);
    if (this && this.update) {
      const boundedStore = this.update.bind(this);
      this.journaly.subscribe(this.element + '.' + 'update', boundedStore);
    }
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  protected abstract updateQuery: string;

  protected async generateUpdate(): Promise<string> {
    const update = `UPDATE ${this.table} SET ${this.updateQuery}`;
    return new Promise((resolve) => {
      resolve(update);
    });
  }

  public async update(id: string, content: DAOSimpleModel): Promise<DAOModel> {
    const values = await this.generateVectorValues(content);
    const select = await this.generateSelect('updated');
    const update = await this.generateUpdate();
    const query =
      `WITH updated AS (${update} WHERE id = $1 ` +
      `RETURNING *` +
      `) ${select} ${this.groupBy}`;
    return new Promise((resolve, reject) => {
      this.pool.query(query, [id, ...values], (error, result) => {
        if (error) {
          return reject(error);
        }
        result = this.fixType(result);
        return resolve(result.rows[0]);
      });
    });
  }
}
