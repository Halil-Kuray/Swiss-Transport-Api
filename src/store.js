import { configureStore } from '@reduxjs/toolkit'
import fromReducers from "./features/fromSlice"

export default configureStore({
  reducer: {
    from: fromReducers
  },
})