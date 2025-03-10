import express from "express";
import { getProducts, calculatePremium, saveInsurance } from "../controllers/productController";

const router = express.Router();

router.get("/getProducts", getProducts);
router.post("/premium-calculation", calculatePremium);
router.post("/save-insurance", saveInsurance); 

export default router;
