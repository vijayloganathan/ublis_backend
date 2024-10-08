// db-helper.ts
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "master_testing_db",
  password: process.env.DB_PASSWORD || "vijay",
  port: Number(process.env.DB_PORT) || 5432,
};

// Helper function to execute a query
export const executeQuery = async (
  query: string,
  params: any[] = []
): Promise<any> => {
  const pool = new Pool(dbConfig);
  let client;
  try {
    client = await pool.connect(); // connect to DB
    const result = await client.query(query, params); // execute query
    return result.rows;
  } catch (error: any) {
    throw new Error(`Database query failed: ${error.message}`);
  } finally {
    client?.release(); // release connection back to the pool
    await pool.end(); // close the pool connection
  }
};
