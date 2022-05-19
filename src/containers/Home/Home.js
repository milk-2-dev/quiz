import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Logout from '../../components/Logout/Logout'
import Quiz from '../Quiz/Quiz'
import QuizCreator from '../QuizCreator/QuizCreator'

const Home = () => {
  return (
    <div>
      <Routes>
        <Route path='/quiz-creator' element={<QuizCreator />} />
        <Route path='/quiz/:id' element={<Quiz />} />
        <Route path='/' element={<Home />} />
        <Route path='/Logout/*' element={<Logout />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </div>
  )
}

export default Home
