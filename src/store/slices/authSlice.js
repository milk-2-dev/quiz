import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from '../../services/authService'

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await authService.signIn(email, password)
      const { _tokenResponse } = data
      thunkAPI.dispatch(setAuthData(_tokenResponse))
      thunkAPI.dispatch(autoLogout(_tokenResponse.expiresIn))
    } catch (error) {
      thunkAPI.dispatch(setAuthError(error.code))
      return thunkAPI.rejectWithValue()
    }
  }
)

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await authService.signUp(email, password)
      const { _tokenResponse } = data
      thunkAPI.dispatch(setAuthData(_tokenResponse))
      thunkAPI.dispatch(autoLogout(_tokenResponse.expiresIn))
    } catch (error) {
      thunkAPI.dispatch(setAuthError(error.code))
      return thunkAPI.rejectWithValue()
    }
  }
)

export const autoLogin = createAsyncThunk(
  'auth/autoLogin',
  (_, { rejectWithValue, dispatch }) => {
    const idToken = localStorage.getItem('token')

    if (!idToken) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))

      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(setAuthData({ idToken }))
        dispatch(
          autoLogout(expirationDate.getTime() - new Date().getTime()) / 1000
        )
      }
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  (_, { rejectWithValue, dispatch }) => {
    authService.logout()
    dispatch(removeAuthData())
  }
)

export const autoLogout = createAsyncThunk(
  'auth/autoLogout',
  async (time, { rejectWithValue, dispatch }) => {
    try {
      setTimeout(() => {
        logout()
      }, time * 1000)
    } catch (error) {
      console.log(error)
      // thunkAPI.dispatch(setAuthError(error.code))
      // return thunkAPI.rejectWithValue()
    }
  }
)

const initialState = {
  authError: null,
  isAuth: false,
  token: null,
  expiresIn: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData(state, action) {
      state.token = action.payload.idToken
      state.isAuth = !!action.payload.idToken
    },
    removeAuthData(state, action) {
      state.isAuth = false
      state.token = null
      state.authError = null
    },
    setAuthError(state, action) {
      state.authError = action.payload.authError
    },
  },
})

export const { setAuthData, removeAuthData, setAuthError } = authSlice.actions
export default authSlice.reducer
