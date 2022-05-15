import React, { useState } from 'react'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import { useDispatch } from 'react-redux'
import { signIn, signUp } from '../../features/auth/authSlice'

const defaultState = {
  isFormValid: false,
  formControls: {
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      errorMessage: 'Введите корректный Email',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true,
      },
    },
    password: {
      value: '',
      type: 'password',
      label: 'Пароль',
      errorMessage: 'Введите корректный пароль',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6,
      },
    },
  },
}

const Auth = () => {
  const [state, setState] = useState(defaultState)
  const dispatch = useDispatch()

  const onChangeHandler = (event, controlName) => {
    const formControls = { ...state.formControls }
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.valid = validateControl(control.value, control.validation)
    control.touched = event.target.value.trim().length > 0

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid
    })

    setState({ ...state, formControls, isFormValid })
  }

  const validateControl = (value, validation) => {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  const onBlurHandler = (event, controlName) => {
    const formControls = { ...state.formControls }
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.valid = validateControl(control.value, control.validation)

    formControls[controlName] = control

    setState({ ...state, formControls })
  }

  const renderInputs = () => {
    return Object.keys(state.formControls).map((controlName, index) => {
      const control = state.formControls[controlName]

      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={(event) => {
            onChangeHandler(event, controlName)
          }}
          onBlur={(event) => {
            onBlurHandler(event, controlName)
          }}
        />
      )
    })
  }

  const loginHandler = async () => {
    const authData = {
      email: state.formControls.email.value,
      password: state.formControls.password.value,
      returnSecureToken: true,
    }

    dispatch(signIn(authData))
  }

  const registerHandler = async () => {
    const authData = {
      email: state.formControls.email.value,
      password: state.formControls.password.value,
      returnSecureToken: true,
    }

    dispatch(signUp(authData))
  }

  const submitHamdler = (event) => {
    event.preventDefault()
  }

  return (
    <div className={classes.Auth}>
      <div>
        <h1>Authorization</h1>

        <form onSubmit={submitHamdler} action='' className={classes.AuthForm}>
          {renderInputs()}

          <Button
            type='success'
            onClick={loginHandler}
            disabled={!state.isFormValid}
          >
            Sign in
          </Button>
          <Button
            type='primary'
            onClick={registerHandler}
            disabled={!state.isFormValid}
          >
            Sign up
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Auth
