import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosQuiz from '../../axios/axios-quiz'

const initialState = {
  quizes: [],
  results: {},
  isFinished: false,
  answerState: null,
  activeQuestion: 0,
  activeQuiz: [],
  loading: true,
}

export const getQuizes = createAsyncThunk(
  'quiz/getQuizes',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosQuiz.get('quizes.json')

      const fetchedQuizes = []

      Object.keys(response.data).forEach((key, index) => {
        fetchedQuizes.push({
          id: key,
          quizName: response.data[key].quizName,
          quizDescription: response.data[key].quizDescription,
        })
      })

      dispatch(setQuizes(fetchedQuizes))
    } catch (error) {
      console.log(error)
    }
  }
)

export const getQuizeById = createAsyncThunk(
  'quiz/getQuizeById',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosQuiz.get(`quizes/${id}.json`)

      dispatch(setQuize(response.data))
    } catch (error) {
      console.log(error)
    }
  }
)

export const createQuize = createAsyncThunk(
  'quiz/createQuize',
  async (quizData, { rejectWithValue, dispatch }) => {
    try {
      await axiosQuiz.post(`quizes.json`, quizData)
    } catch (error) {
      console.log(error)
    }
  }
)

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuizes(state, action) {
      state.quizes = action.payload
      state.loading = false
    },
    setQuize(state, action) {
      state.activeQuiz = action.payload.quizQuestions
      state.loading = false
    },
    setAnswer(state, action) {
      state.answerState = action.payload.answerState
      state.results = action.payload.results
    },
    finishQuiz(state, action) {
      state.isFinished = true
    },
    setNextQuestion(state, action) {
      state.activeQuestion = state.activeQuestion + 1
      state.answerState = null
    },
    retryQuiz(state, action) {
      state.answerState = null
      state.results = {}
      state.isFinished = false
      state.activeQuestion = 0
    },
  },
  extraReducers: {
    [getQuizes.pending]: () => {},
    [getQuizes.fulfilled]: () => {},
    [getQuizes.rejected]: () => {},
    [getQuizeById.pending]: () => {},
    [getQuizeById.fulfilled]: () => {},
    [getQuizeById.rejected]: () => {},
    [createQuize.pending]: () => {},
    [createQuize.fulfilled]: () => {},
    [createQuize.rejected]: () => {},
  },
})

export const {
  setQuizes,
  setQuize,
  setAnswer,
  finishQuiz,
  setNextQuestion,
  retryQuiz,
} = quizSlice.actions
export default quizSlice.reducer
