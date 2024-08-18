import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    podcasts: [],
}

const PodcastSlice = createSlice({
    name:"podcasts",
    initialState,
    reducers: {
        setPodcasts: (state,action) =>{
            state.podcasts = action.payload;
        },
    },
});

export const {setPodcasts} = PodcastSlice.actions;
export default PodcastSlice.reducer;