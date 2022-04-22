import { configureStore } from '@reduxjs/toolkit'
import apiReducer from './apiSlice'

export const store = configureStore({
  reducer: {
	  api: apiReducer
  }
})

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch