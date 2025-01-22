import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllShopProductsApi } from "../apiUrls";

const fetchAllShopProductsService = createAsyncThunk(
  "/products/fetchAllShopProducts",
  async (filterParams, sortParams) => {
    try {
      const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
      });
      const fetchAllShopProductsResponse = await axios.get(
        `${fetchAllShopProductsApi}/get?${query}`
      );

      return fetchAllShopProductsResponse?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export default fetchAllShopProductsService;
