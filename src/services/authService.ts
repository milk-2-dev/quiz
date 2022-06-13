import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { authFirebaseSDK } from '../firebase'

const setLocalStorageData = (localId: string, email: string) => {
  localStorage.setItem('email', email)
  localStorage.setItem('userId', localId)
}

const clearLocalStorageData = () => {
  localStorage.removeItem('userId')
  localStorage.removeItem('email')
}

type authFunc = (email: string, password: string) => {}

const signUp: authFunc = async (email, password) => {
  const response = await createUserWithEmailAndPassword(
    authFirebaseSDK,
    email,
    password
  )
  return setLocalStorageData(response.user.uid, response.user.email)
}

const signIn: authFunc = async (email, password) => {
  const response = await signInWithEmailAndPassword(
    authFirebaseSDK,
    email,
    password
  )
  return setLocalStorageData(response.user.uid, response.user.email)
}

const singOut = () => {
  signOut(authFirebaseSDK).then(() => clearLocalStorageData())
}

const autoSingOut = () => {
  clearLocalStorageData()
}

const authService = {
  signUp,
  signIn,
  singOut,
  autoSingOut,
}
export default authService
