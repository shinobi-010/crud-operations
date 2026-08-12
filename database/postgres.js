import 'dotenv/config';
import pg from 'pg';
const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


async function initDb() {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS USERS (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) not null,
    role VARCHAR(100) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;
    try {
        await pool.query(createTableQuery);
        console.log(`user table ready in postgres`);
    }
    catch (err) {
        console.log("err in creating table", err.message);
    }
}


// Test the connection instantly
pool.connect()
  .then(client => {
    console.log("postgres db connected successfully");
    client.release();
    initDb();
  })
  .catch(err => {
    console.error("postgres connection error", err.stack);
  });
