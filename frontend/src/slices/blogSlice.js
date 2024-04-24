import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pageNumber:3
    
   
}

const blogSlice = createSlice({
    name:'blog',
    initialState,
    reducers:{
       changePageNumber:(state,action)=>{
        state.pageNumber=action.payload
       }

        
    }
});

export const {changePageNumber} = blogSlice.actions;

export default blogSlice.reducer;