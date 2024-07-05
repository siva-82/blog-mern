import { apiSlice } from "./apiSlice";
const BLOGS_URL = "/api/allBlogs";
const CREATE_BLOG_URL = "api/upload/";



export const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => ({
        url: `${process.env.REACT_APP_BACKEND_URL}/api/posts`,
        method: "GET",
      }),
      providesTags: ["Comments"],
    }),

    getBlogSearch: builder.query({
      query: (search) => ({
        url: `${process.env.REACT_APP_BACKEND_URL}${BLOGS_URL}/${search}`,
        method: "GET",
      }),
    }),

    getSingleBlog: builder.query({
      query: (id) => ({
        url: `${process.env.REACT_APP_BACKEND_URL}${BLOGS_URL}/${id}`,
        method: "GET",
      }),
    }),

    addBlog: builder.mutation({
      query: (data) => ({
        url: `${process.env.REACT_APP_BACKEND_URL}/${CREATE_BLOG_URL}`,
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Comments"],
    }),

    editBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `${process.env.REACT_APP_BACKEND_URL}/api/upload/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `${process.env.REACT_APP_BACKEND_URL}${BLOGS_URL}/delete`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetSingleBlogQuery,
  useGetBlogSearchQuery,
  useAddBlogMutation,
  useEditBlogMutation,
  useDeleteBlogMutation,
} = blogApiSlice;
