import React from "react";
import { getPaymentFrequencyLabel } from "../utils/helpers";

interface PremiumResultProps {
  result: {
    planCode: string;
    baseSumAssured: number;
    baseAnnualPremium: number;
    modalPremium: number;
    productTerm: number;
    premiumPayingTerm: number;
    paymentFrequencyCd: string;
  };
}

const PremiumResult: React.FC<PremiumResultProps> = ({ result }) => {
  return (
    <div className="w-full lg:w-1/3 bg-orange-100 p-6 rounded-lg">
      <h3 className="text-xl font-bold text-gray-700 mb-4">แผนของคุณ</h3>
      <div className="bg-white p-4 shadow rounded-lg">
        <h4 className="text-lg font-semibold">แผนประกัน: {result.planCode}</h4>
        <p className="text-sm text-gray-600">ทุนประกัน: {result.baseSumAssured.toLocaleString()} บาท</p>
        <p className="text-sm text-gray-600">เบี้ยประกันต่อปี: {result.baseAnnualPremium.toLocaleString()} บาท</p>
        <p className="text-sm text-gray-600">เบี้ยที่ต้องชำระ: {result.modalPremium.toLocaleString()} บาท</p>
        <p className="text-sm text-gray-600">ระยะเวลาคุ้มครอง: {result.productTerm} ปี</p>
        <p className="text-sm text-gray-600">ระยะเวลาชำระเบี้ย: {result.premiumPayingTerm} ปี</p>
        <p className="text-sm text-gray-600">งวดการชำระเบี้ย: {getPaymentFrequencyLabel(result.paymentFrequencyCd)}</p>

        <button className="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg font-bold hover:bg-orange-600 transition">
          ซื้อออนไลน์
        </button>
      </div>
    </div>
  );
};

export default PremiumResult;
