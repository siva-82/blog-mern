import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageNumber: 1,
  blogSearch: "",
  allBlogsData: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    searchBlog: (state, action) => {
      state.blogSearch = action.payload;
    },
    clearSearchBlog: (state) => {
      state.blogSearch = "";
    },
    changePageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
  },
});

export const { searchBlog, clearSearchBlog, changePageNumber } =
  blogSlice.actions;

export default blogSlice.reducer;
