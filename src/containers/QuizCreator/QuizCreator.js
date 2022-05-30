import React, { useState } from 'react'
import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import { createControl, validate, validateForm } from '../../form/formFramework'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import { useDispatch } from 'react-redux'
import { createQuize } from '../../features/quiz/quizSlice'
import { useFormFields } from '../../lib/hooksLib'

const createOptionControl = (number) => {
  return createControl(
    {
      label: `Answer #${number}`,
      errorMessage: `Value can't be empty`,
      id: number,
    },
    { required: true }
  )
}

const createFormControls = () => {
  return {
    question: createControl(
      {
        label: 'Enter your question',
        errorMessage: `Question can't be empty`,
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

const defaultState = {
  correctAnswerId: 1,
  // quizName: '',
  // quizDescription: '',
  quizQuestions: [],
  quiz: [],
  formControls: createFormControls(),
  isFormValid: false,
}

const QuizCreator = () => {
  const [state, setState] = useState(defaultState)

  // const [quizQuestions, setQuizQuestions] = useState(defaultState.quizQuestions)

  const [fields, handleFieldChange, handleValidationError] = useFormFields({
    quizName: {
      value: '',
      errorMessage: null,
    },
    quizDescription: {
      value: '',
      errorMessage: null,
    },
  })

  const dispatch = useDispatch()

  const addQuestionHandler = () => {
    // const quiz = state.quiz.concat()
    const quiz = state.quizQuestions.concat()
    const index = state.quizQuestions.length + 1

    const { question, option1, option2, option3, option4 } = state.formControls

    const questionItem = {
      question: question.value,
      id: index,
      correctAnswerId: state.correctAnswerId,
      answers: [
        {
          text: option1.value,
          id: option1.id,
        },
        {
          text: option2.value,
          id: option2.id,
        },
        {
          text: option3.value,
          id: option3.id,
        },
        {
          text: option4.value,
          id: option4.id,
        },
      ],
    }

    quiz.push(questionItem)

    setState({
      ...state,
      quiz,
      quizQuestions: quiz,
      isformValid: false,
      correctAnswerId: 1,
      formControls: createFormControls(),
    })
  }

  const createQuizHandler = (event) => {
    // dispatch(createQuize(state.quiz)).then(() => {
    const quizData = {
      quizName: fields.quizName.value,
      quizDescription: fields.quizDescription.value,
      quizQuestions: state.quizQuestions,
    }
    dispatch(createQuize(quizData)).then(() => {
      // setState({ ...state, quiz: [] })
      setState({ ...state, quizQuestions: [] })
    })
  }

  const submitHandler = (event) => {
    event.preventDefault()
  }

  const inputChangeHandler = (value, controlName) => {
    const formControls = { ...state.formControls }
    const control = { ...formControls[controlName] }

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    setState({
      ...state,
      formControls,
      isformValid: validateForm(formControls),
    })
  }

  const renderControls = () => {
    return Object.keys(state.formControls).map((controlName, index) => {
      const control = state.formControls[controlName]

      return (
        <React.Fragment key={index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMassage={control.errorMassage}
            onChange={(event) =>
              inputChangeHandler(event.target.value, controlName)
            }
          />

          {index === 0 ? <hr /> : null}
        </React.Fragment>
      )
    })
  }

  const selectChangeHandler = (event) => {
    setState({ ...state, correctAnswerId: +event.target.value })
  }

  return (
    <div className={classes.QuizCreator}>
      <div>
        <h1>Create new quiz</h1>

        <form onSubmit={submitHandler}>
          <div className='form_group' size='lg'>
            <label className='form_label'>Quiz name</label>
            <input
              className='form_control'
              autoFocus
              type='text'
              placeholder='Quiz name'
              controlid='quizName'
              value={fields.quizName.value}
              onChange={handleFieldChange}
            />

            {/* {fields.email.errorMessage ? (
            <div className='invalid_feedback'>test</div>
            ) : null} */}
          </div>

          <div className='form_group' size='lg'>
            <label className='form_label'>Quiz description</label>
            <textarea
              className='form_control'
              autoFocus
              type='text'
              placeholder='Quiz description'
              controlid='quizDescription'
              value={fields.quizDescription.value}
              onChange={handleFieldChange}
            ></textarea>

            {/* {fields.email.errorMessage ? (
            <div className='invalid_feedback'>test</div>
            ) : null} */}
          </div>

          {renderControls()}

          <Select
            label='Select correct answer'
            value={state.correctAnswerId}
            onChange={selectChangeHandler}
            options={[
              { text: 1, value: 1 },
              { text: 2, value: 2 },
              { text: 3, value: 3 },
              { text: 4, value: 4 },
            ]}
          ></Select>

          <Button
            type='primary'
            onClick={addQuestionHandler}
            disabled={!state.isformValid}
          >
            Add question
          </Button>
          <Button
            type='success'
            onClick={createQuizHandler}
            disabled={state.quizQuestions.length === 0}
          >
            Create quiz
          </Button>
        </form>
      </div>
    </div>
  )
}

export default QuizCreator
