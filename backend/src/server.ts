import express from 'express';
import cors from 'cors';
import pool from './database';
import premiumRoutes from './routes/productRoutes'; //  เพิ่มไฟล์ Route
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', premiumRoutes); // โหลด API Routes

// ตรวจสอบการเชื่อมต่อ MySQL
pool.getConnection()
  .then(connection => {
    console.log('MySQL Connected');
    connection.release(); // ปล่อย Connection หลังจากเชื่อมต่อสำเร็จ
  })
  .catch(err => {
    console.error('MySQL Connection Error:', err);
    process.exit(1); // ปิดโปรเซสถ้าเชื่อมต่อ MySQL ไม่ได้
  });

// ตรวจสอบว่า Express Server รันอยู่หรือไม่
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
