import React from 'react'
import classes from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList'

function ActiveQuiz(props) {
  return (
    <div className={classes.ActiveQuiz}>
      <h1>Give your answer</h1>
      <div className={classes.ActiveQuizWrapper}>
        <p className={classes.Question}>
          <span>
            <strong>{props.questionNumber}.</strong>&nbsp; {props.question}
          </span>

          <small>
            {props.questionNumber} of {props.quizLength}
          </small>
        </p>
        <AnswersList
          answers={props.answers}
          onAnswerClick={props.onAnswerClick}
          answerState={props.answerState}
        />
      </div>
    </div>
  )
}

export default ActiveQuiz
