import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchShopProductDetailsApi } from "../apiUrls";

const fetchShopProductDetails = createAsyncThunk(
  "/products/fetchShopProductDetails",
  async (id) => {
    try {
      const fetchShopProductDetailsResponse = await axios.get(
        `${fetchShopProductDetailsApi}/${id}`
      );

      console.log(
        "fetchShopProductDetailsResponse : ",
        fetchShopProductDetailsResponse
      );
      console.log(
        "fetchShopProductDetailsResponse.data : ",
        fetchShopProductDetailsResponse.data
      );

      return fetchShopProductDetailsResponse?.data;
    } catch (error) {
      console.log("error : ", error);
      return error.response.data;
    }
  }
);

export default fetchShopProductDetails;
