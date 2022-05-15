import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import classes from './QuizList.module.css'
import Loading from '../../components/UI/Loader/Loader'
import { getQuizes } from '../../features/quiz/quizSlice'

const QuizList = () => {
  const quiz = useSelector((state) => state.quiz)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getQuizes())
  }, [])

  const renderQuizes = () => {
    return quiz.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
        </li>
      )
    })
  }

  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Quizes list</h1>
        {quiz.loading ? <Loading /> : <ul>{renderQuizes()}</ul>}
      </div>
    </div>
  )
}

export default QuizList
