import { createSlice } from '@reduxjs/toolkit'

export const apiSlice = createSlice({
  name: 'api',
  initialState: {
	  url: 'https://crud-nodejs-express-firebase.vercel.app', // default
    refresh: false,
    user: {}
  },
  reducers: {
    setUrl: (state, action) => {
      state.url = action.payload
    },
    setRefresh: (state) => {
      state.refresh = !state.refresh
    },
    setUser: (state, action) => {
      state.user = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUrl, setRefresh, setUser } = apiSlice.actions

export default apiSlice.reducer