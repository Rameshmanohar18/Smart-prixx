import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import compareReducer from './compareSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    compare: compareReducer,
  },
})

export default store
