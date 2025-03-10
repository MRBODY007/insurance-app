import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '1234567890',
  database: process.env.DB_NAME || 'insuranceDB',
  port: Number(process.env.DB_PORT) || 3306,
  charset: 'utf8mb4' // ✅ เพิ่ม charset ให้รองรับภาษาไทย
});

pool.getConnection()
  .then(() => console.log('✅ MySQL Connected'))
  .catch(err => {
    console.error('❌ MySQL Connection Error:', err.message);
    console.error('🔍 ตรวจสอบว่าคุณเปิด MySQL หรือยัง และข้อมูล .env ถูกต้อง');
  });

export default pool;
