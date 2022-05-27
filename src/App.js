import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './containers/Auth/Auth'
import QuizList from './containers/QuizList/QuizList'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { autoLogin } from './features/auth/authSlice'
import './sassStyles/index.scss'
import { isAdmin } from './utils/userUtils'

function App() {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(autoLogin())
  }, [])

  let routes = (
    <Routes>
      <Route path='/auth' element={<Auth />} />
      <Route path='/*' element={<Navigate to='/auth' replace />} />
    </Routes>
  )

  if (auth.isAuthenticated) {
    routes = (
      <Routes>
        <Route path='/' element={<QuizList />} />
        {isAdmin() ? (
          <Route path='/quiz-creator' element={<QuizCreator />} />
        ) : null}
        <Route path='/quiz/:id' element={<Quiz />} />
        <Route path='/*' element={<Navigate to='/' replace />} />
      </Routes>
    )
  }

  return <Layout>{routes}</Layout>
}

export default App
