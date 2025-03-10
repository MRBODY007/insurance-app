import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
});

// ✅ ดึงแผนประกันจาก API

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axiosInstance.get("/getProducts");
  return response.data;
});

export const calculatePremium = createAsyncThunk(
  "premium/calculatePremium",
  async (formData: Record<string, any>) => {
    const response = await axiosInstance.post("/premium-calculation", formData);
    return response.data;
  }
);

// ✅ กำหนดประเภทของแผนประกัน
export interface Product {
  planCode: string;
  packageName: string;
  benefit: string;
}

// ✅ กำหนดประเภทของ `initialState`
interface PremiumState {
  products: Product[];
  data: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PremiumState = {
  products: [],
  data: null,
  status: "idle",
  error: null,
};

const premiumSlice = createSlice({
  name: "premium",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ โหลดแผนประกัน
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload; // ✅ เก็บข้อมูลแผนประกัน
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error fetching products";
      })

      // ✅ คำนวณเบี้ยประกัน
      .addCase(calculatePremium.pending, (state) => {
        state.status = "loading";
      })
      .addCase(calculatePremium.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(calculatePremium.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default premiumSlice.reducer;
