import React, { useRef, useState } from 'react'
import classes from './Auth.module.scss'
import { CSSTransition } from 'react-transition-group'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

const defaultState = {
  welcome: true,
  form: false,
  formMode: 'sign_in',
}

const Auth = () => {
  const [state, setState] = useState(defaultState)

  const renderBGPatterns = () => {
    return (
      <React.Fragment>
        <div
          className={`${classes.circle} ${classes.circle_xl} ${classes.random_position}`}
        ></div>
        <div
          className={`${classes.circle} ${classes.circle_sm} ${classes.random_position}`}
        ></div>
        <div
          className={`${classes.triangle} ${classes.triangle_sm} ${classes.random_position}`}
        ></div>
        <div
          className={`${classes.circle} ${classes.circle_sm} ${classes.random_position}`}
        ></div>
        <div
          className={`${classes.circle} ${classes.circle_xl} ${classes.random_position}`}
        ></div>
        <div
          className={`${classes.ring} ${classes.ring_sm} ${classes.random_position}`}
        ></div>
        <div
          className={`${classes.ring} ${classes.ring_sm} ${classes.random_position}`}
        ></div>
        <div
          className={`${classes.triangle} ${classes.triangle_sm} ${classes.random_position}`}
        ></div>
      </React.Fragment>
    )
  }

  const toggleHandler = (event) => {
    event.preventDefault()

    setState({
      ...state,
      formMode: state.formMode === 'sign_in' ? 'sign_up' : 'sign_in',
    })
  }

  const welcomeNodeRef = useRef(null)
  const formNodeRef = useRef(null)

  return (
    <div className={classes.Auth}>
      {renderBGPatterns()}
      <div>
        <CSSTransition
          nodeRef={welcomeNodeRef}
          in={state.welcome}
          timeout={1500}
          unmountOnExit
          appear={true}
          classNames={{
            appear: classes.welcome_enter,
            appearActive: classes.welcome_enter_active,
            enter: classes.welcome_enter,
            enterActive: classes.welcome_enter_active,
            enterDone: classes.welcome_enter_done,
            exit: 'my-exit',
            exitActive: classes.welcome_exit_active,
            exitDone: 'my-done-exit',
          }}
          onEntered={() => setState({ ...state, form: true })}
        >
          <div ref={welcomeNodeRef} className={classes.AuthWelcome}>
            <h1>Welcome</h1>
          </div>
        </CSSTransition>
      </div>

      {state.form ? (
        <CSSTransition
          nodeRef={formNodeRef}
          in={state.form}
          appear
          timeout={{
            appear: 500,
            enter: 800,
            exit: 200,
          }}
          classNames={{
            appear: classes.form_enter,
            appearActive: classes.form_enter_active,
            appearDone: classes.form_appear_active,
            enter: classes.form_enter,
            enterActive: classes.form_enter_active,
            enterDone: classes.form_enter_done,
          }}
        >
          <div ref={formNodeRef} className={classes.AuthWrapper}>
            <div className={classes.AuthContent}>
              <div className={classes.FormToggler}>
                <p>
                  {state.formMode === 'sign_in'
                    ? 'Not registered yet? '
                    : 'Already registered? '}
                  <a href='/' onClick={toggleHandler}>
                    {state.formMode === 'sign_in' ? 'Sign up' : 'Sign in'}
                  </a>
                </p>
              </div>

              <div className={classes.Form}>
                {state.formMode === 'sign_in' ? <SignInForm /> : <SignUpForm />}
              </div>
            </div>
          </div>
        </CSSTransition>
      ) : null}
    </div>
  )
}

export default Auth
