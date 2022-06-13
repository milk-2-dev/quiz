import React, { useEffect } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import { useParams } from 'react-router-dom'
import Loading from '../../components/UI/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getQuizeById } from '../../features/quiz/quizSlice'
import {
  setAnswer,
  finishQuiz,
  setNextQuestion,
  retryQuiz,
} from '../../features/quiz/quizSlice'

function Quiz() {
  const quiz = useSelector((state) => state.quiz)
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getQuizeById(id))
    return () => {
      dispatch(retryQuiz())
    }
  }, [])

  const onAnswerClick = (answerId) => {
    if (quiz.answerState) {
      const key = Object.keys(quiz.answerState)[0]

      if (quiz.answerState[key] === 'success') {
        return
      }
    }

    const question = quiz.activeQuiz[quiz.activeQuestion]
    const results = { ...quiz.results }

    if (question.correctAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      dispatch(
        setAnswer({
          answerState: { [answerId]: 'success' },
          results,
        })
      )

      const timeout = window.setTimeout(() => {
        if (isQuizFinished()) {
          dispatch(finishQuiz())
        } else {
          dispatch(setNextQuestion())
        }

        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'error'

      dispatch(
        setAnswer({
          answerState: { [answerId]: 'error' },
          results,
        })
      )
    }
  }

  const isQuizFinished = () => {
    return quiz.activeQuestion + 1 === quiz.activeQuiz.length
  }

  const retryHandler = () => {
    dispatch(retryQuiz())
  }

  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        {quiz.loading || quiz.activeQuiz.length === 0 ? (
          <Loading />
        ) : quiz.isFinished ? (
          <FinishedQuiz
            results={quiz.results}
            quiz={quiz.activeQuiz}
            onRetry={retryHandler}
          />
        ) : (
          <ActiveQuiz
            answers={quiz.activeQuiz[quiz.activeQuestion].answers}
            question={quiz.activeQuiz[quiz.activeQuestion].question}
            onAnswerClick={onAnswerClick}
            quizLength={quiz.activeQuiz.length}
            questionNumber={quiz.activeQuestion + 1}
            answerState={quiz.answerState}
          />
        )}
      </div>
    </div>
  )
}

export default Quiz
