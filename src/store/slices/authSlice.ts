import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import authService from '../../services/authService'
import { isAdmin } from '../../utils/userUtils'

export const signIn = createAsyncThunk(
  'auth/signIn',
  ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      authService.signIn(email, password)
      thunkAPI.dispatch(setIsAuth(true))
      thunkAPI.dispatch(setIsAdmin(isAdmin(email)))
    } catch (error) {
      thunkAPI.dispatch(
        setAuthError({ code: error.code, message: error.message })
      )
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      await authService.signUp(email, password)
      thunkAPI.dispatch(setIsAuth(true))
      thunkAPI.dispatch(setIsAdmin(isAdmin(email)))
    } catch (error) {
      thunkAPI.dispatch(
        setAuthError({ code: error.code, message: error.message })
      )
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const signOut = createAsyncThunk('auth/signOut', (_, thunkAPI) => {
  try {
    authService.singOut()
    thunkAPI.dispatch(setIsAuth(false))
  } catch (error) {
    thunkAPI.dispatch(
      setAuthError({ code: error.code, message: error.message })
    )
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const autoSingIn = createAsyncThunk('auth/autoSingIn', (_, thunkAPI) => {
  thunkAPI.dispatch(setIsAuth(!!localStorage.getItem('userId')))
  thunkAPI.dispatch(setIsAdmin(isAdmin(localStorage.getItem('email'))))
})

export const autoSingOut = createAsyncThunk(
  'auth/signOut',
  (_, { rejectWithValue, dispatch }) => {
    authService.autoSingOut()
    dispatch(setIsAuth(false))
  }
)

type AuthError = { code: string; message: string }

type SliceState = {
  error: AuthError | null
  isAuth: boolean
  isAdmin: boolean
  token: string
  expiresIn: string
}

const initialState: SliceState = {
  error: null,
  isAuth: false,
  isAdmin: false,
  token: null,
  expiresIn: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth(state: SliceState, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
    },
    setIsAdmin(state: SliceState, action: PayloadAction<boolean>) {
      state.isAdmin = action.payload
    },
    setAuthError(state: SliceState, action: PayloadAction<AuthError>) {
      state.error = action.payload
    },
  },
})

export const { setIsAuth, setIsAdmin, setAuthError } = authSlice.actions
export default authSlice.reducer
