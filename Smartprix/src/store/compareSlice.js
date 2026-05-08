import { createSlice } from '@reduxjs/toolkit'

const compareSlice = createSlice({
  name: 'compare',
  initialState: { items: [] },
  reducers: {
    addToCompare: (state, action) => {
      if (
        state.items.length < 4 &&
        !state.items.find((p) => p._id === action.payload._id)
      ) {
        state.items.push(action.payload)
      }
    },
    removeFromCompare: (state, action) => {
      state.items = state.items.filter((p) => p._id !== action.payload)
    },
    clearCompare: (state) => {
      state.items = []
    },
  },
})

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions
export const selectCompare = (state) => state.compare.items
export default compareSlice.reducer
