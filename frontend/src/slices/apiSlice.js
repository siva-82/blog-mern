import  { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'

const baseQuery =fetchBaseQuery({baseUrl:'https://blog-mern-rtk.onrender.com',  prepareHeaders(headers) {
      return headers;
    },
    credentials: "include"})

export const apiSlice=createApi({
    baseQuery,
    tagTypes:['User','Blogs','Comments'],
    endpoints:(builder)=>({}),
})
