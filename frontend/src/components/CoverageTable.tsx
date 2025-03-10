import React, { useState } from "react";
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

const mockData = [
  {
    category: "ค่ารักษาพยาบาล",
    items: [
      {
        coverageType: "ค่ารักษาพยาบาลในกรณีผู้ป่วยใน (IPD)",
        planA: "500,000 บาท",
        planB: "1,000,000 บาท",
        planC: "2,000,000 บาท",
      },
      {
        coverageType: "ค่ารักษาผู้ป่วยนอก (OPD)",
        planA: "1,500 บาท/ครั้ง",
        planB: "2,500 บาท/ครั้ง",
        planC: "3,500 บาท/ครั้ง",
      },
    ],
  },
  {
    category: "ค่าห้องและค่าอาหาร",
    items: [
      {
        coverageType: "ค่าห้องและค่าอาหาร",
        planA: "2,000 บาท/วัน",
        planB: "4,000 บาท/วัน",
        planC: "6,000 บาท/วัน",
      },
      {
        coverageType: "ค่าห้อง ICU",
        planA: "4,000 บาท/วัน",
        planB: "8,000 บาท/วัน",
        planC: "12,000 บาท/วัน",
      },
    ],
  },
];

const CoverageTable: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); //  ค่าเริ่มต้นเป็นปิด

  return (
    <div className="mx-auto mt-4  shadow-lg rounded-xl ">
      {/*  ปุ่ม Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-orange-500 text-white text-lg font-semibold px-6 py-4 rounded-xl hover:bg-orange-600 transition "
      >
        ตารางความคุ้มครองประกันสุขภาพ
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {/*  เพิ่ม `overflow-x-auto` เพื่อให้ Scroll ได้ */}
      {isOpen && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-max border-collapse  ">
            <thead className="rounded-b-2xl">
              <tr className="bg-gray-200 text-gray-700 text-center ">
                <th className="p-3 whitespace-nowrap  text-sm sm:text-base ">
                  รายการความคุ้มครอง
                </th>
                <th className="p-3 whitespace-nowrap  text-sm sm:text-base">
                  แผน A
                </th>
                <th className="p-3 whitespace-nowrap  text-sm sm:text-base">
                  แผน B
                </th>
                <th className="p-3 whitespace-nowrap  text-sm sm:text-base">
                  แผน C
                </th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((category, catIndex) => (
                <React.Fragment key={catIndex}>
                  {/*  เพิ่ม `whitespace-nowrap` ป้องกันข้อความซ้อนกัน */}
                  <tr className="bg-gray-100 text-gray-800 ">
                    <td
                      className="p-3 font-bold text-lg text-left "
                      colSpan={4}
                    >
                      {category.category}
                    </td>
                  </tr>

                  {category.items.map((item, index) => (
                    <tr
                      key={index}
                      className=" text-center hover:bg-gray-100"
                    >
                      <td className="p-3 text-left flex items-center gap-2  whitespace-nowrap text-sm sm:text-base">
                        <CheckCircle className="text-[#354942]" size={20} />
                        {item.coverageType}
                      </td>
                      <td className="p-3  whitespace-nowrap text-sm sm:text-base">
                        {item.planA}
                      </td>
                      <td className="p-3  whitespace-nowrap text-sm sm:text-base">
                        {item.planB}
                      </td>
                      <td className="p-3  whitespace-nowrap text-sm sm:text-base">
                        {item.planC}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CoverageTable;
