import React, { useState, useEffect } from "react";
import {
  User,
  Calendar,
  CreditCard,
  Minus,
  Plus,
  ShoppingCart,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { calculatePremium, fetchProducts } from "../redux/premiumSlice";
import { RootState } from "../redux/store";
import { Product } from "../redux/premiumSlice";
import { getPaymentFrequencyLabel } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import Banner from "../assets/Banner.jpg"; //  นำเข้าภาพ

const InsurancePlans: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [premiumResults, setPremiumResults] = useState<{ [key: string]: any }>(
    {}
  );
  const navigate = useNavigate(); //  ใช้ navigate() เพื่อไปยังหน้าใหม่
  const dispatch = useAppDispatch();
  const products = useAppSelector((state: RootState) => state.premium.products);
  const status = useAppSelector((state: RootState) => state.premium.status);

  const [formData, setFormData] = useState({
    genderCd: "",
    dob: "",
    premiumPerYear: 50000,
    paymentFrequency: "YEARLY",
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handlePremiumChange = (amount: number) => {
    setFormData((prev) => ({
      ...prev,
      premiumPerYear: Math.max(
        20000,
        Math.min(400000, prev.premiumPerYear + amount)
      ),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCalculatePremium = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault(); // ป้องกันการ submit แบบ default
    setIsLoading(true);

    const results: { [key: string]: any } = {};
    await Promise.all(
      products.map(async (product) => {
        try {
          const result = await dispatch(
            calculatePremium({ planCode: product.planCode, ...formData })
          ).unwrap();

          results[product.planCode] =
            result && Object.keys(result).length > 0
              ? result
              : { noPackage: true };
        } catch (error) {
          results[product.planCode] = { noPackage: true };
        }
      })
    );

    setPremiumResults(results);
    setIsLoading(false);
  };

  const handleSelectPlan = (product: Product) => {
    const selectedPlan = {
      ...product,
      premiumResult: premiumResults[product.planCode],
    };
    navigate("/fill-info", { state: { selectedPlan } });
  };

  return (
    <div className="max-w-6xl mx-auto p-6  min-h-screen">
      {/* 🏷️ PROMOTION BANNER */}
      <div className="relative w-full max-w-6xl mx-auto rounded-xl  overflow-hidden shadow-xl">
        {/* 🔹 ภาพพื้นหลัง */}
        <img
          src={Banner}
          alt="Banner"
          className="w-full h-72 object-cover filter brightness-50"
        />

        {/* 🔹 ข้อความอยู่ทับรูป */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white text-2xl font-semibold text-center bg-[#f97316] bg-opacity-100 px-6 py-3 rounded-lg shadow-lg">
            สมัครประกันวันนี้ รับส่วนลดสูงสุด 20% + ของแถมพิเศษ!
          </h2>
        </div>
      </div>
      {/* 🔹 PLANS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {products.map((product: Product) => (
          <div
            key={product.planCode}
            className="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-orange-500 transition-all hover:scale-105 hover:shadow-xl h-full flex flex-col  "
          >
            {/*  หัวข้อแผนประกัน พร้อมไอคอน */}
            <h3 className="text-xl font-semibold text-orange-500 text-center flex items-center justify-center gap-2 mb-7">
              <ShieldCheck className="text-[#354942]" size={28} />
              {product.packageName}
            </h3>

            {/*  ความคุ้มครอง */}
            <p className="text-center text-gray-500 mt-2 font-thai ">
              ความคุ้มครองสูงสุด
            </p>
            <p className="text-center text-3xl font-bold text-orange-500  ">
              {product.benefit?.toLocaleString()} บาท/ปี
            </p>

            {premiumResults[product.planCode] ? (
              premiumResults[product.planCode].noPackage ? (
                <div className="mt-4 p-4 text-lg rounded-xl font-bold text-center text-gray-500">
                  ไม่มี Package สำหรับแผนนี้
                </div>
              ) : (
                <div className="mt-4 p-4 rounded-xl flex flex-col justify-between h-full">
                  <h4 className="text-lg font-semibold text-gray-700 text-center font-thai">
                    ราคาเบี้ยประกันภัยสำหรับคุณ
                  </h4>

                  <div className="space-y-2">
                    <p className="text-md text-gray-500 flex justify-between">
                      <span>ทุนประกัน:</span>
                      <span className="font-bold text-gray-500">
                        {premiumResults[
                          product.planCode
                        ].baseSumAssured?.toLocaleString()}{" "}
                        บาท
                      </span>
                    </p>

                    <p className="text-md text-gray-500 flex justify-between">
                      <span>ค่าเบี้ยประกันรายปี:</span>
                      <span className="font-bold text-gray-500">
                        {premiumResults[
                          product.planCode
                        ].baseAnnualPremium?.toLocaleString()}{" "}
                        บาท
                      </span>
                    </p>

                    <p className="text-md text-gray-500 flex justify-between">
                      <span>รูปแบบการชำระเงิน:</span>
                      <span className="font-bold text-gray-500">
                        {getPaymentFrequencyLabel(
                          premiumResults[product.planCode]?.paymentFrequencyCd
                        )}
                      </span>
                    </p>

                    <p className="text-md text-gray-500 flex justify-between">
                      <span>ระยะเวลาชำระเบี้ย:</span>
                      <span className="font-bold text-gray-500">
                        {premiumResults[product.planCode].premiumPayingTerm} ปี
                      </span>
                    </p>

                    <p className="text-md text-gray-500 flex justify-between">
                      <span>ระยะเวลาคุ้มครอง:</span>
                      <span className="font-bold text-gray-500">
                        {premiumResults[product.planCode].productTerm} ปี
                      </span>
                    </p>
                  </div>

                  {/*  ปุ่มเลือกแผน พร้อมไอคอน */}
                  <button
                    className="w-full mt-4 py-2 bg-[#354942] text-white font-semibold rounded-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                    onClick={() => handleSelectPlan(product)}
                  >
                    <ShoppingCart size={22} /> เลือกแผนนี้
                  </button>
                </div>
              )
            ) : (
              <p className="text-sm text-center text-gray-400 mt-7">
                ตรวจสอบราคาเบี้ยด้านล่าง
              </p>
            )}
          </div>
        ))}
      </div>
      {/* 📊 FORM */}
      <div className="bg-white shadow-lg rounded-2xl p-8 mx-auto max-w-6xl mt-10">
        <h2 className="text-xl font-semibold mb-6 text-gray-700 text-center">
          ดูเบี้ยประกันของคุณ
        </h2>

        <form onSubmit={handleCalculatePremium} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 flex items-center gap-2">
                <User size={18} /> ฉันเป็น
              </label>
              <select
                name="genderCd"
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg"
              >
                <option value="">เลือกเพศ</option>
                <option value="MALE">ชาย</option>
                <option value="FEMALE">หญิง</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 flex items-center gap-2">
                <Calendar size={18} /> วันเกิด
              </label>
              <input
                type="date"
                name="dob"
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>

          {/* งวดการชำระเบี้ย */}
          <div>
            <label className="block text-gray-400 flex items-center gap-2">
              <CreditCard size={18} /> งวดการชำระเบี้ย
            </label>
            <select
              name="paymentFrequency"
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            >
              <option value="YEARLY">รายปี</option>
              <option value="HALFYEARLY">รายครึ่งปี</option>
              <option value="QUARTERLY">ราย 3 เดือน</option>
              <option value="MONTHLY">รายเดือน</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            ทุนประกันที่ต้องการ
            <button
              type="button"
              onClick={() => handlePremiumChange(-5000)}
              className="px-3 py-2 bg-orange-300 text-white rounded-lg"
            >
              <Minus size={18} />
            </button>
            <span className="text-xl font-bold">
              {formData.premiumPerYear.toLocaleString()} บาท
            </span>
            <button
              type="button"
              onClick={() => handlePremiumChange(5000)}
              className="px-3 py-2 bg-orange-300 text-white rounded-lg"
            >
              <Plus size={18} />
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-orange-400 text-white font-semibold rounded-xl hover:bg-orange-700 transition-all flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "คำนวณเบี้ยสำหรับทุกแผน"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InsurancePlans;
