import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InsuranceForm from "./components/InsuranceForm"; //  ตรวจสอบ path ให้ถูกต้อง
import FillInfo from "./components/FillInfo"; //  Import ไฟล์ FillInfo

function App() {
  return (
    <Router>
      <div className="w-full container mx-auto p-4">
        {/* <h1 className="text-xl font-bold text-center">FWD Insurance</h1> */}
        
        <Routes>
          <Route path="/" element={<InsuranceForm />} /> {/*  เปิดหน้าแรกเป็น InsuranceForm */}
          <Route path="/fill-info" element={<FillInfo />} /> {/*  ไปที่หน้ากรอกข้อมูล */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
