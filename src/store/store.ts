import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import quizReducer from './slices/quizSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    quiz: quizReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
