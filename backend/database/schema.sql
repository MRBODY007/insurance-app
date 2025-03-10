-- เลือก Database ที่ต้องการใช้งาน
CREATE DATABASE IF NOT EXISTS insurancedb;
USE insurancedb;

-- แสดงรายการตาราง (สามารถใช้เพื่อตรวจสอบหลังจากสร้างตาราง)
SHOW TABLES;

--  สร้างตาราง `insurance_forms`
CREATE TABLE IF NOT EXISTS insurance_forms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  gender VARCHAR(10),
  birth_date DATE,
  id_number VARCHAR(13),
  email VARCHAR(100) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(10),
  agree_terms BOOLEAN,
  plan_code VARCHAR(20),
  package_name VARCHAR(255),
  benefit VARCHAR(50),
  base_annual_premium DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ตรวจสอบข้อมูลในตาราง (หลังจากเพิ่มข้อมูลแล้ว)
SELECT * FROM insurance_forms;
