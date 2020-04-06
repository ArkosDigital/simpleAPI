import Utils from '../../source/utils';
import { Pool } from 'pg';
import database from './database';
const postgres = new Pool(database);
export default class TestUtils {
  public static async init(): Promise<void> {
    await Utils.init(postgres);
  }

  public static async populate(): Promise<void> {
    await Utils.populate(postgres);
  }

  public static async dropTables(): Promise<void> {
    await Utils.dropTables(postgres);
  }

  public static async end(): Promise<void> {
    await Utils.end(postgres);
  }

  public static async exit(): Promise<void> {
    await Utils.exit(postgres);
  }
}
