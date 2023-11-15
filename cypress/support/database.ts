import * as sql from "mssql";

const config = {
  user: "",
  password: "",
  server: "",
  database: "",
  options: {
    encrypt: true,
  },
};

export class DatabaseService {
  private async connect() {
    try {
      const pool = await sql.connect(config);

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
}
