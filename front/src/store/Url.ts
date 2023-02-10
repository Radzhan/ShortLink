import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface Transaction {
}

const initialState: Transaction = {
};

export const UrlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
  },
});

export const urlReducer = UrlSlice.reducer;
