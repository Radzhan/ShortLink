import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axiosApi from "../axiosApi";
import { UrlApi } from "../types";
interface Transaction {
  url: UrlApi;
  shortUrl: string;
}

const initialState: Transaction = {
  url: {
    _id: "",
    shortUrl: "",
    originalUrl: "",
  },
  shortUrl: "",
};

interface ForPost {
  url: string;
}

export const setUrl = createAsyncThunk<UrlApi, ForPost>(
  "url/set",
  async (arg) => {
    const request = await axiosApi.post("/links", arg);

    return request.data;
  }
);

export const getShortUrl = createAsyncThunk<string, string>(
  "url/get",
  async (arg) => {
    const request = await axiosApi.get("/" + arg);

    return request.data;
  }
);

export const UrlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setUrl.fulfilled, (state, action) => {
      state.url = action.payload;
    });
    builder.addCase(getShortUrl.fulfilled, (state, action) => {
      state.shortUrl = action.payload;
    });
  },
});

export const urlReducer = UrlSlice.reducer;
export const SetLink = (state: RootState) => state.url.url;
