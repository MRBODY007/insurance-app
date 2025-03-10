import { Request, Response } from "express";
import axios from "axios";
import { Premium } from "../models/Premium";
import { logger } from "../utils/logger"; // ✅ ใช้ Logger แทน console.log
import { API_BASE, API_KEY } from "../config/apiConfig"; // ✅ แยก API Config ออกเป็นไฟล์
import pool from "../database";

/** 
 * @desc Fetch all insurance products
 * @route GET /api/getProducts
 */
export const getProducts = async (req: Request, res: Response) => {
  try {
    logger.info("📡 Fetching insurance products...");
    const response = await axios.get(`${API_BASE}/getProducts`);

    logger.info("✅ Products fetched successfully.");
    res.status(200).json(response.data);
  } catch (error: any) {
    logger.error("❌ Error fetching products:");
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

/** 
 * @desc Calculate premium for selected insurance plan
 * @route POST /api/premium-calculation
 */
export const calculatePremium = async (req: Request, res: Response) => {
  try {
    const { genderCd, dob, planCode, premiumPerYear, paymentFrequency } = req.body;

    logger.info(`📡 Calculating premium for Plan: ${planCode}, Gender: ${genderCd}`);

    const response = await axios.post(
      `${API_BASE}/premium-calculation`,
      { genderCd, dob, planCode, premiumPerYear, paymentFrequency },
      { headers: { "x-api-key": API_KEY } }
    );

    // logger.info("✅ Premium calculated successfully:", response.data);

    res.status(200).json(response.data);
  } catch (error: any) {
    logger.error("❌ Error calculating premium:");
    res.status(500).json({ message: "Error calculating premium", error: error.message });
  }
};

/** 
 * @desc Save insurance form data to database
 * @route POST /api/save-form
 */
export const saveInsurance = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      birthDate,
      idNumber,
      email,
      phoneNumber,
      address,
      city,
      postalCode,
      agreeTerms,
      selectedPlan,
    } = req.body;

    // ✅ ตรวจสอบว่ามีแผนประกันหรือไม่
    if (!selectedPlan) {
      return res.status(400).json({
        status: "error",
        errorCode: "NO_PLAN_SELECTED",
        message: "กรุณาเลือกแผนประกันก่อนทำการบันทึกข้อมูล",
      });
    }

    const { planCode, packageName, benefit, premiumResult } = selectedPlan;
    const { baseAnnualPremium } = premiumResult || {};

    const sql = `
      INSERT INTO insurance_forms 
      (first_name, last_name, gender, birth_date, id_number, email, phone_number, address, city, postal_code, agree_terms, plan_code, package_name, benefit, base_annual_premium)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      firstName,
      lastName,
      gender,
      birthDate,
      idNumber,
      email,
      phoneNumber,
      address,
      city,
      postalCode,
      agreeTerms ? 1 : 0, // ✅ Convert boolean to 1/0
      planCode,
      packageName,
      benefit,
      baseAnnualPremium,
    ];

    const [result] = await pool.query(sql, values);

    return res.status(201).json({
      status: "success",
      message: "✅ บันทึกข้อมูลสำเร็จ",
      data: {
        insertedId: (result as any).insertId, // ✅ คืนค่า ID ที่เพิ่มเข้าไปใน database
        firstName,
        lastName,
        email,
        phoneNumber,
        planCode,
        packageName,
        baseAnnualPremium,
      },
    });
  } catch (error: any) {
    console.error("❌ Error saving insurance form:", error);

    return res.status(500).json({
      status: "error",
      errorCode: "INTERNAL_SERVER_ERROR",
      message: "❌ เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่",
      errorDetails: error.message, // ✅ แสดงรายละเอียดข้อผิดพลาด (ใช้สำหรับ debug)
    });
  }
};
