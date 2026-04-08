import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "u517026704_mineweb",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "u517026704_mineweb",
  waitForConnections: true,
  connectionLimit: 10,
});

export async function initDB() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      id VARCHAR(64) PRIMARY KEY,
      channelName VARCHAR(255),
      channelLink VARCHAR(500),
      projectType VARCHAR(255),
      description TEXT,
      referenceLinks TEXT,
      attachedFiles TEXT,
      budget DECIMAL(10,2),
      deadline VARCHAR(100),
      email VARCHAR(255),
      discord VARCHAR(255),
      submittedAt VARCHAR(100)
    )
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS shop_items (
      id VARCHAR(64) PRIMARY KEY,
      title VARCHAR(255),
      description TEXT,
      price DECIMAL(10,2),
      type VARCHAR(255),
      youtubeLink VARCHAR(500),
      buyAction VARCHAR(500),
      imageData LONGTEXT,
      createdAt VARCHAR(100),
      sortOrder INT DEFAULT 0
    )
  `);
}

export default pool;
