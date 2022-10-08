import { configureStore } from "@reduxjs/toolkit";

import roadmapEditorReducer from "./slice/roadmapEditorSlice";

const store = configureStore({
  reducer: {
    roadmapEditor: roadmapEditorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
