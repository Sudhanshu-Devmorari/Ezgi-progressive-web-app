import { createSlice } from '@reduxjs/toolkit'


const userSlice = createSlice({
    initialState: {},
    name: "user",
    reducers : {
        setUserDetails: (state, action) => {
            state.user = action.payload;
        } 
    }
})

export default userSlice.reducer;

export const { setUserDetails } = userSlice.actions;
