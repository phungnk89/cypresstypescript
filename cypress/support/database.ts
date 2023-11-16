import * as sql from "mssql";

export class DatabaseService {
  public config: any;

  private async connect() {
    try {
      const pool = await sql.connect(this.config);

      return pool;
    } catch (err) {
      console.error("Error connecting to the database:", err);
      throw err;
    }
  }

  private async disconnect(pool: sql.ConnectionPool) {
    try {
      await pool.close();
    } catch (err) {
      console.error("Error disconnecting from the database:", err);
      throw err;
    }
  }

  public async cleanUpDB(): Promise<number> {
    const pool = await this.connect();

    try {
      const result = await pool
        .request()
        .query("delete from AspNetUsers where Email like 'cypress%'");

      return result.rowsAffected[0];
    } catch (err) {
      console.error("Error performing database operations:", err);
      return -1;
    } finally {
      await this.disconnect(pool);
    }
  }

  public async executeQuery(query: string): Promise<any> {
    const pool = await this.connect();

    try {
      const result = await pool.request().query(query);

      return result.recordset[0];
    } catch (err) {
      console.error("Error performing database operations:", err);
      throw err;
    } finally {
      await this.disconnect(pool);
    }
  }
}
