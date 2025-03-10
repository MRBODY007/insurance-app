import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import { getPaymentFrequencyLabel } from "../utils/helpers";
// import toast from "react-hot-toast"; // ✅ Import toast
import InsuranceSuccessModal from "./InsuranceSuccessModal"; // ✅ Import Modal
import { FileText, ShieldCheck, Hash } from "lucide-react"; // ✅ Import ไอคอนที่ใช้
import Banner from "../assets/Banner.jpg"; // ✅ นำเข้าภาพ
import CoverageTable from "./CoverageTable";
const formSchema = z.object({
  firstName: z.string().min(1, "กรุณากรอกชื่อ"),
  lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
  gender: z.string().min(1, "กรุณาเลือกเพศ"),
  birthDate: z.string().min(1, "กรุณาเลือกวันเกิด"),
  idNumber: z
    .string()
    .regex(/^\d{13}$/, "กรุณากรอกเลขบัตรประชาชน 13 หลักที่ถูกต้อง"), // ✅ รับเฉพาะตัวเลข 13 หลัก
  email: z.string().email("กรุณากรอกอีเมลให้ถูกต้อง"),
  phoneNumber: z.string().min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"),
  address: z.string().min(1, "กรุณากรอกที่อยู่"),
  city: z.string().min(1, "กรุณากรอกจังหวัด"),
  postalCode: z.string().min(5, "กรุณากรอกรหัสไปรษณีย์ให้ถูกต้อง"),
  agreeTerms: z
    .boolean()
    .refine((val) => val, "คุณต้องยอมรับเงื่อนไขก่อนส่งฟอร์ม"),
});

const FillInfo: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPlan = location.state?.selectedPlan || null;
  // ✅ ใช้ useState ควบคุม Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const requestData = {
        ...data,
        selectedPlan,
      };

      const response = await fetch("http://localhost:5001/api/save-insurance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.status === 201) {
        // alert("✅ บันทึกข้อมูลสำเร็จ!");
        // toast.success("✅ บันทึกข้อมูลสำเร็จ!"); // 🎉 Toast Alert สำหรับสำเร็จ
        setIsModalOpen(true); // ✅ แสดง Modal เมื่อบันทึกสำเร็จ
      }
    } catch (error) {
      console.error("Error:", error);
      // toast.error("❌ เกิดข้อผิดพลาดในการบันทึกข้อมูล!"); // ❌ Toast Alert สำหรับ Error
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* ✅ เรียกใช้ InsuranceSuccessModal */}
      <InsuranceSuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        navigate={navigate}
      />
      {/* หัวข้อ */}
      <div className="relative w-full max-w-6xl mx-auto rounded-xl  overflow-hidden shadow-xl">
        {/* 🔹 ภาพพื้นหลัง */}
        <img
          src={Banner}
          alt="Banner"
          className="w-full h-72 object-cover filter brightness-50"
        />

        {/* 🔹 ข้อความอยู่ทับรูป */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center bg-[#f97316] bg-opacity-100 px-6 py-4 rounded-lg shadow-lg">
            {/* ✅ ชื่อแผนประกัน */}
            <p className="text-3xl font-semibold text-[#354942]">
              ชื่อแผนประกัน:{" "}
              <span className="font-bold text-[#354942]">{selectedPlan.packageName}</span>
            </p>

            {/* ✅ ความคุ้มครอง (บรรทัดเล็กกว่า) */}
            <p className="text-lg font-medium mt-1">
              ความคุ้มครอง:{" "}
              <span className="font-bold">
                {selectedPlan.benefit.toLocaleString()} บาท
              </span>
            </p>
          </div>
        </div>
      </div>

      {selectedPlan ? (
        <div className="bg-gradient-to-br from-white to-gray-100 border border-gray-300 p-6 rounded-lg shadow-lg mt-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            ข้อมูลแผนประกันที่คุณเลือก
          </h3>

          <div className="mt-4 space-y-3">
            <div className="flex items-center text-gray-700">
              <FileText className="w-5 h-5 text-gray-500 mr-2" />
              <span className="font-semibold">ชื่อแผนประกัน:</span>
              <span className="ml-2 text-gray-900 font-medium">
                {selectedPlan.packageName}
              </span>
            </div>

            <div className="flex items-center ">
              <ShieldCheck className="w-5 h-5  mr-2" />
              <span className="font-semibold">ความคุ้มครอง:</span>
              <span className="ml-2 ">
                {selectedPlan.benefit.toLocaleString()} บาท
              </span>
            </div>

            <div className="flex items-center text-gray-700">
              <Hash className="w-5 h-5 text-blue-500 mr-2" />
              <span className="font-semibold">รหัสแผนประกัน:</span>
              <span className="ml-2 text-gray-900 font-medium">
                {selectedPlan.planCode}
              </span>
            </div>
          </div>
        </div>
        
      ) : (
        <p className="text-center text-red-500 mt-4">⚠️ ไม่มีแผนที่เลือกไว้</p>
      )}
      <div
         className="">
             <CoverageTable/>
        </div>
      {/* ฟอร์ม */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="bg-white p-6 shadow-md rounded-lg mt-6 space-y-4"
      >
        {/* ข้อมูลทั่วไป */}
        <h3 className="text-lg font-semibold text-gray-700">
          กรุณากรอกข้อมูลผู้เอาประกัน
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600">ชื่อ *</label>
            <input
              type="text"
              {...register("firstName")}
              className="w-full p-2 border rounded-md"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600">นามสกุล *</label>
            <input
              type="text"
              {...register("lastName")}
              className="w-full p-2 border rounded-md"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600">เลขบัตรประชาชน *</label>
            <input
              type="text" // ✅ ต้องเป็น text เพื่อให้ผู้ใช้กรอกเลข 13 หลัก
              {...register("idNumber")}
              className="w-full p-2 border rounded-md"
            />
            {errors.idNumber && (
              <p className="text-red-500 text-sm">{errors.idNumber.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600">เพศ *</label>
            <select
              {...register("gender")}
              className="w-full p-2 border rounded-md"
            >
              <option value="">เลือกเพศ</option>
              <option value="MALE">ชาย</option>
              <option value="FEMALE">หญิง</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>
        </div>

        {/* เพศ & วันเกิด */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600">วันเกิด *</label>
            <input
              type="date"
              {...register("birthDate")}
              className="w-full p-2 border rounded-md"
            />
            {errors.birthDate && (
              <p className="text-red-500 text-sm">{errors.birthDate.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600">ที่อยู่ *</label>
            <textarea
              {...register("address")}
              className="w-full p-2 border rounded-md"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600">จังหวัด *</label>
            <input
              type="text"
              {...register("city")}
              className="w-full p-2 border rounded-md"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600">รหัสไปรษณีย์ *</label>
            <input
              type="text"
              {...register("postalCode")}
              className="w-full p-2 border rounded-md"
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm">
                {errors.postalCode.message}
              </p>
            )}
          </div>
        </div>
        {/* ข้อมูลการติดต่อ */}
        <h3 className="text-lg font-semibold text-gray-700">
          ข้อมูลสำหรับติดต่อกลับ
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600">อีเมล *</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-2 border rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600">เบอร์โทรศัพท์ *</label>
            <input
              type="text"
              {...register("phoneNumber")}
              className="w-full p-2 border rounded-md"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        {/* ที่อยู่ */}

        {/* ข้อตกลง & นโยบาย */}
        <div>
          <label className="flex items-center space-x-2 text-gray-700">
            <input type="checkbox" {...register("agreeTerms")} />
            <span>ฉันยอมรับเงื่อนไขและนโยบายความเป็นส่วนตัว</span>
          </label>
          {errors.agreeTerms && (
            <p className="text-red-500 text-sm">{errors.agreeTerms.message}</p>
          )}
        </div>

        {/* ปุ่มส่งข้อมูล */}
        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-3 rounded-md font-semibold hover:bg-orange-700 transition"
        >
          ส่งข้อมูล
        </button>
      </form>
    </div>
  );
};

export default FillInfo;
