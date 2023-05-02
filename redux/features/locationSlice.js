import { createSlice } from '@reduxjs/toolkit'

export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    location: {
      latitude: '',
      longitude: '',
    },
  },
  reducers: {
    setLocation: (state, action) => {
      state.location.latitude = action.payload.latitude
      state.location.longitude = action.payload.longitude
    },
  },
})

export const { setLocation } = locationSlice.actions

export const selectLocation = state => state.location.location

export default locationSlice.reducer
