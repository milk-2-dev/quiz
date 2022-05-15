import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  token: null,
  isAuthenticated: false,
}

const setLocalStorageData = (data) => {
  const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

  localStorage.setItem('token', data.idToken)
  localStorage.setItem('userId', data.localId)
  localStorage.setItem('expirationDate', expirationDate)
}

const clearLocalStorageData = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
}

export const autoLogout = createAsyncThunk(
  'auth/autoLogout',
  async (time, { rejectWithValue, dispatch }) => {
    try {
      setTimeout(() => {
        logout()
      }, time * 1000)
    } catch (error) {
      console.log(error)
    }
  }
)

export const autoLogin = createAsyncThunk(
  'auth/autoLogin',
  (_, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem('token')
    debugger
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))

      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(setToken(token))
        dispatch(
          autoLogout(expirationDate.getTime() - new Date().getTime()) / 1000
        )
      }
    }
  }
)

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyChFI8iWYY1kYXKRemHXU4SZ8rqRv9V2DM',
        userData
      )

      setLocalStorageData(response.data)

      dispatch(setToken(response.data.idToken))
      dispatch(autoLogout(response.data.expiresIn))
    } catch (error) {
      console.log(error)
    }
  }
)

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyChFI8iWYY1kYXKRemHXU4SZ8rqRv9V2DM',
        userData
      )

      setLocalStorageData(response.data)

      dispatch(setToken(response.data.idToken))
      dispatch(autoLogout(response.data.expiresIn))
    } catch (error) {
      console.log(error)
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  (_, { rejectWithValue, dispatch }) => {
    clearLocalStorageData()
    dispatch(clearToken())
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
      state.isAuthenticated = true
    },
    clearToken: (state, action) => {
      state.token = null
      state.isAuthenticated = false
    },
  },
})

export const { setToken, clearToken } = authSlice.actions
export default authSlice.reducer
