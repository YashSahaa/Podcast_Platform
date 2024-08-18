import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import podcastReducer from "./slices/PodcastSlice";

export default configureStore({
    reducer:{
        user: userReducer,
        podcasts : podcastReducer,
    },
});