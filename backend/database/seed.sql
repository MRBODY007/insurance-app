USE insurancedb;

-- ✅ เพิ่มข้อมูลตัวอย่าง
INSERT INTO insurance_forms (first_name, last_name, gender, birth_date, id_number, email, phone_number, address, city, postal_code, agree_terms, plan_code, package_name, benefit, base_annual_premium)
VALUES
  ('John', 'Doe', 'Male', '1990-01-01', '1234567890123', 'johndoe@example.com', '0812345678', '123 Main Street', 'Bangkok', '10100', TRUE, 'P001', 'Gold Plan', 'Health', 12000.00),
  ('Jane', 'Smith', 'Female', '1992-05-15', '9876543210987', 'janesmith@example.com', '0898765432', '456 Second Street', 'Chiang Mai', '50200', TRUE, 'P002', 'Silver Plan', 'Life', 8000.00);
