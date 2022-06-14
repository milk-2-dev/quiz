import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axiosQuiz from '../../axios/axios-quiz'

type SliceState = {
  quizes: QuizListItem[]
  results: Results
  isFinished: boolean
  answerState: Results
  activeQuestion: number
  activeQuiz: QuizItemQuestion[]
  loading: boolean
}

type Results = Record<number, AnswerState> | {}
type AnswerState = 'success' | 'error'

type QuizListItem = {
  id: number
  quizName: string
  quizDescription: string
  quizQuestionsCount: number
}

type QuizItem = {
  quizName: string
  quizDescription: string
  quizQuestions: QuizItemQuestion[]
}

type QuizItemQuestion = {
  id: number
  question: string
  correctAnswerId: number
  answers: AnswerItem[]
}

type AnswerItem = {
  id: number
  text: string
}

const initialState: SliceState = {
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
  async (_, thunkAPI) => {
    try {
      const response = await axiosQuiz.get('quizes.json')

      const fetchedQuizes = []
      Object.keys(response.data).forEach((key, index) => {
        fetchedQuizes.push({
          id: key,
          quizName: response.data[key].quizName,
          quizDescription: response.data[key].quizDescription,
          quizQuestionsCount: response.data[key].quizQuestions.length,
        })
      })

      thunkAPI.dispatch(setQuizes(fetchedQuizes))
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const getQuizeById = createAsyncThunk(
  'quiz/getQuizeById',
  async (id: string, thunkAPI) => {
    try {
      const { data } = await axiosQuiz.get<QuizItem>(`quizes/${id}.json`, {
        headers: {
          Accept: 'application/json',
        },
      })

      thunkAPI.dispatch(setQuize(data.quizQuestions))
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const createQuize = createAsyncThunk(
  'quiz/createQuize',
  async (quizData, thunkAPI) => {
    try {
      await axiosQuiz.post(`quizes.json`, quizData)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuizes(state: SliceState, action: PayloadAction<QuizListItem[]>) {
      state.quizes = action.payload
      state.loading = false
    },
    setQuize(state: SliceState, action: PayloadAction<QuizItemQuestion[]>) {
      state.activeQuiz = action.payload
      state.loading = false
    },
    setAnswer(
      state: SliceState,
      action: PayloadAction<{ answerState: Results; results: Results }>
    ) {
      state.answerState = action.payload.answerState
      state.results = action.payload.results
    },
    finishQuiz(state: SliceState) {
      state.isFinished = true
    },
    setNextQuestion(state: SliceState) {
      state.activeQuestion = state.activeQuestion + 1
      state.answerState = null
    },
    retryQuiz(state: SliceState) {
      state.answerState = null
      state.results = {}
      state.isFinished = false
      state.activeQuestion = 0
    },
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
