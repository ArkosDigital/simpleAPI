import BigNumber from 'bignumber.js';
import { Journaly } from 'journaly';
import { settings } from 'ts-mixer';
settings.initFunction = 'init';
/* eslint-disable @typescript-eslint/no-explicit-any */
export default class BaseDAODefault {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  protected table: string;
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  protected element: string;
  protected init(pool, journaly: Journaly<any>): void {
    this.pool = pool;
    this.journaly = journaly;
    this.table = this.constructor.name; //TODO: modify to DB structure
    this.element = this.constructor.name;
  }

  protected journaly;
  protected pool;

  protected groupBy = '';
  protected values = '*';

  protected selectJoin = '';
  protected async generateSelect(alias: string): Promise<string> {
    const select = `SELECT ${this.values} FROM ${alias} AS element ${this.selectJoin}`;
    return new Promise((resolve) => {
      resolve(select);
    });
  }
  protected fixDate(rows: Array<any>, field: string): any {
    rows = rows.map((row) => {
      row[field] = new Date(row[field]).toISOString();
      return row;
    });
    return rows;
  }

  protected fixBigNumber(rows: Array<any>, field: string): any {
    rows = rows.map((row) => {
      row[field] = new BigNumber(row[field]).toString();
      return row;
    });
    return rows;
  }

  protected fixUndefined(rows: Array<any>, field: string): any {
    rows = rows.map((row) => {
      row[field] = !row[field] ? undefined : row[field];
      return row;
    });
    return rows;
  }

  protected fixType(result: any): any {
    if (result.rows[0]) {
      if (result.rows[0].timestamp) {
        result.rows = this.fixDate(result.rows, 'timestamp');
      }
      if (result.rows[0].conclusion_date === null) {
        result.rows = this.fixUndefined(result.rows, 'conclusion_date');
      }
      if (result.rows[0].conclusion_date) {
        result.rows = this.fixDate(result.rows, 'conclusion_date');
      }
      if (result.rows[0].quantity) {
        result.rows = this.fixBigNumber(result.rows, 'quantity');
      }
      if (result.rows[0].quantity_payed) {
        result.rows = this.fixBigNumber(result.rows, 'quantity_payed');
      }
      if (result.rows[0].value_quantity) {
        result.rows = this.fixBigNumber(result.rows, 'value_quantity');
      }
      if (result.rows[0].product_quantity) {
        result.rows = this.fixBigNumber(result.rows, 'product_quantity');
      }
    }
    return result;
  }
}
