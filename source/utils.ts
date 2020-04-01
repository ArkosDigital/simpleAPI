import { promises } from 'fs';
export default class Utils {
  public static async init(pool): Promise<void> {
    const createScript = await promises.readFile(
      './database/createExtension.sql',
      'utf8'
    );
    const script = await promises.readFile(
      './database/createTables.sql',
      'utf8'
    );
    await pool.query(createScript + script);
  }

  public static async populate(pool): Promise<void> {
    const populateTables = await promises.readFile(
      './database/insertDB.sql',
      'utf8'
    );
    await pool.query(populateTables);
  }

  public static async dropTables(pool): Promise<void> {
    const dropTables = await promises.readFile(
      './database/dropScript.sql',
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
