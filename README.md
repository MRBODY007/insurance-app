# 🏦 Insurance App

Insurance App เป็นแอปพลิเคชันที่ใช้จัดการข้อมูลประกันภัย โดยแยกโครงสร้างเป็น **Backend** และ **Frontend**
insurance-app/
│── backend/         # โค้ดฝั่งเซิร์ฟเวอร์ (Node.js, Express)
│   ├── src/         # โค้ดหลักของ API
│   ├── models/      # โมเดลฐานข้อมูล
│   ├── routes/      # Routing ต่างๆ
│   ├── controllers/ # Logic ของ API
│   ├── .env         # ค่าคอนฟิก (หากมี)
│   └── server.js    # Entry point ของ backend
│
│── frontend/        # โค้ดฝั่ง Client (React.js)
│   ├── src/         # ไฟล์หลักของ React
│   ├── components/  # UI Components
│   ├── pages/       # หน้าเว็บแต่ละหน้า
│   ├── .env         # ค่าคอนฟิก frontend (หากมี)
│   └── App.js       # Entry point ของ frontend
│
│── README.md        # ไฟล์อธิบายโปรเจกต์
│── package.json     # ข้อมูล dependencies และ scripts
└── .gitignore       # กำหนดไฟล์ที่ไม่ต้องการให้ Git ติดตาม


## 🚀 เริ่มต้นใช้งาน

### 🔹 1. **Clone Repository**
ดาวน์โหลดโปรเจกต์จาก GitHub
```sh
git clone https://github.com/your-repo/insurance-app.git
cd insurance-app

ติดตั้ง Dependencies  Backend
cd backend
npm install

📌 ถ้าหากเกิดปัญหา version conflict ให้ใช้:
npm install --force


Frontend
cd frontend
npm install

🚀 เริ่มรันโปรเจกต์
1. รัน Backend
cd backend


2. รัน Frontend
cd frontend
npm start
