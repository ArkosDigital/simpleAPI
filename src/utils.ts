import * as fs from 'fs';

export default class Utils {
  public static async init(pool): Promise<void> {
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

  public static async populate(pool): Promise<void> {
    const populateTables = await fs.promises.readFile(
      './database/insert_db.sql',
      'utf8'
    );
    await pool.query(populateTables);
  }

  public static async dropTables(pool): Promise<void> {
    const dropTables = await fs.promises.readFile(
      './database/drop_script.sql',
      'utf8'
    );
    await pool.query(dropTables);
  }

  public static async end(pool): Promise<void> {
    await Utils.dropTables(pool);
    await Utils.exit(pool);
  }

  public static async exit(pool): Promise<void> {
    await pool.end();
  }
}
