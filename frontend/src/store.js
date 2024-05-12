import {configureStore} from '@reduxjs/toolkit' 
import authReducer from './slices/authSlice';
import blogReducer from './slices/blogSlice';
import { apiSlice } from './slices/apiSlice';
const store= configureStore({
    reducer:{
        auth: authReducer,
        blog:blogReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
});

export default store;