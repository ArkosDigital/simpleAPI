import * as fs from 'fs';
import pool from './database/postgresDatabase';

export default class Utils {
  public static async init(): Promise<void> {
    const createScript = await fs.promises.readFile(
      './database/create_extension.sql',
      'utf8'
    );
    const script = await fs.promises.readFile(
      './database/create_tables.sql',
      'utf8'
    );
    await pool.query(createScript + script);
  }

  public static async populate(): Promise<void> {
    const populateTables = await fs.promises.readFile(
      './database/insert_db.sql',
      'utf8'
    );
    await pool.query(populateTables);
  }

  public static async dropTables(): Promise<void> {
    const dropTables = await fs.promises.readFile(
      './database/drop_script.sql',
      'utf8'
    );
    await pool.query(dropTables);
  }

  public static async end(): Promise<void> {
    await Utils.dropTables();
    await Utils.exit();
  }

  public static async exit(): Promise<void> {
    await pool.end();
  }
}
