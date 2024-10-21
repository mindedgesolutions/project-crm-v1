import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "@/features/currentUserSlice";
import commonReducer from "@/features/commonSlice";

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    common: commonReducer,
  },
});

export default store;
