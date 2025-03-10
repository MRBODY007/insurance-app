import React from "react";
import { useLocation } from "react-router-dom"; //  ใช้ useLocation() เพื่อรับ state

const FillInfo: React.FC = () => {
  const location = useLocation();
  const selectedPlan = location.state?.selectedPlan; //  รับข้อมูลแผนที่ถูกเลือก

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">กรอกข้อมูลของคุณ</h2>

      {/*  แสดงข้อมูลแผนที่ถูกเลือก */}
      {selectedPlan ? (
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-bold text-gray-700">แผนที่เลือก: {selectedPlan.packageName}</h3>
          <p className="text-gray-600">ความคุ้มครอง: {selectedPlan.benefit.toLocaleString()} บาท</p>
          <p className="text-gray-600">เบี้ยรายปี: {selectedPlan.baseAnnualPremium.toLocaleString()} บาท</p>
        </div>
      ) : (
        <p className="text-center text-gray-500">ไม่มีข้อมูลแผนที่เลือก</p>
      )}

      {/*  ฟอร์มกรอกข้อมูล */}
      <form>
        <label className="block text-gray-700">ชื่อ-นามสกุล</label>
        <input type="text" className="w-full p-3 border rounded-lg mb-4" required />

        <label className="block text-gray-700">วันเกิด</label>
        <input type="date" className="w-full p-3 border rounded-lg mb-4" required />

        <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          ยืนยันข้อมูล
        </button>
      </form>
    </div>
  );
};

export default FillInfo;
