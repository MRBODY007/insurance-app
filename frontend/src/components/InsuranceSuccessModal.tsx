import React from "react";
import Modal from "react-modal";
import { X, CheckCircle, Phone, Mail } from "lucide-react";

interface InsuranceSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: (path: string) => void;
}

//  ตั้งค่าให้ Modal ใช้งานใน root ของแอป
Modal.setAppElement("#root");

const InsuranceSuccessModal: React.FC<InsuranceSuccessModalProps> = ({
  isOpen,
  onClose,
  navigate,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      className="bg-white p-6 rounded-lg shadow-xl max-w-md text-center relative animate-fade-in"
      aria-label="Success Modal"
      aria-labelledby="success-modal-title"
    >
      {/* ปุ่มปิด Modal */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      {/*  ไอคอนแสดงความสำเร็จ */}
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

      <h2 id="success-modal-title" className="text-xl font-semibold text-gray-700">
        🎉 ขอบคุณสำหรับข้อมูลของคุณ!
      </h2>

      <p className="mt-2 text-gray-600">
        เจ้าหน้าที่ของเราจะติดต่อกลับไปหาคุณในเร็วๆ นี้ <br />
        กรุณารอการติดต่อจากทีมงาน
      </p>

      {/*  ข้อมูลการติดต่อ */}
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-center space-x-2 text-gray-700">
          <Phone className="w-5 h-5 text-blue-500" />
          <span>โทร: 02-123-4567</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-gray-700">
          <Mail className="w-5 h-5 text-blue-500" />
          <span>อีเมล: support@insurance.com</span>
        </div>
      </div>

      {/*  ปุ่มปิด Modal และกลับหน้าแรก */}
      <button
        onClick={() => {
          onClose();
          navigate("/"); //  ปิด Modal และกลับไปหน้าแรก
        }}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        ตกลง
      </button>
    </Modal>
  );
};

export default InsuranceSuccessModal;
