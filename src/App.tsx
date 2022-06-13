import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './containers/Auth/Auth'
import QuizList from './containers/QuizList/QuizList'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import { useAppDispatch } from './hooks/redux'
import { useEffect } from 'react'
import { autoSingOut, setIsAuth } from './store/slices/authSlice'
import './sassStyles/index.scss'
import { isAdmin } from './utils/userUtils'
import { useAuth } from './hooks/useAuth'
import { firebaseObserver } from './firebase'

function App() {
  const { isAuth } = useAuth()
  const dispatch = useAppDispatch()

  useEffect(() => {
    firebaseObserver.subscribe('authStateChanged', (isLoggedIn: boolean) => {
      if (!isLoggedIn && isAuth) {
        dispatch(autoSingOut())
      }
    })
    return () => {
      firebaseObserver.unsubscribe('authStateChanged')
    }
  }, [])

  let routes = (
    <Routes>
      <Route path='/auth' element={<Auth />} />
      <Route path='/*' element={<Navigate to='/auth' replace />} />
    </Routes>
  )

  if (isAuth) {
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
