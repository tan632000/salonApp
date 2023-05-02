import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: {},
    role: '',
    token: '',
    userId: ''
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name
      state.role = action.payload.role
      state.token = action.payload.token
      state.userId = action.payload.userId
    },
    removeUser: state => {
      state.name = {}
      state.role = ''
      state.token = '',
      state.userId = ''
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export const selectUsername = state => state.user.name
export const selectUserRole = state => state.user.role
export const selectUserToken = state => state.user.token
export const selectUserId = state => state.user.userId

export default userSlice.reducer
