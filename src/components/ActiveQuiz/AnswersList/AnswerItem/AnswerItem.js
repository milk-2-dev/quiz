import React from 'react'
import classes from './AnswerItem.module.css'

const AnswerItem = ({ answer, onAnswerClick, answerState }) => {
  const cls = [classes.AnswerItem]

  if (answerState) {
    cls.push(classes[answerState])
  }

  return (
    <li
      className={cls.join(' ')}
      onClick={() => {
        onAnswerClick(answer.id)
      }}
    >
      {answer.text}
    </li>
  )
}

export default AnswerItem
