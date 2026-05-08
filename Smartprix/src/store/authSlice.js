import { createSlice } from '@reduxjs/toolkit'

const stored = JSON.parse(localStorage.getItem('auth') || 'null')

const initialState = {
  user: stored?.user || null,
  accessToken: stored?.accessToken || null,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.error = null
      localStorage.setItem('auth', JSON.stringify({
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      }))
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
      localStorage.removeItem('auth')
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { setCredentials, logout, setLoading, setError } = authSlice.actions
export const selectUser = (state) => state.auth.user
export const selectToken = (state) => state.auth.accessToken
export default authSlice.reducer
