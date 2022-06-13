import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { authFirebaseSDK } from '../firebase'

const setLocalStorageData = (localId) => {
  localStorage.setItem('userId', localId)
}

const clearLocalStorageData = () => {
  localStorage.removeItem('userId')
}

interface IAuthData {
  email: string
  password: string
}

type authFunc = (email: string, password: string) => {}

const signUp: authFunc = (email, password) => {
  return createUserWithEmailAndPassword(authFirebaseSDK, email, password).then(
    (response) => setLocalStorageData(response.user.uid)
  )
}

const signIn = (email, password) => {
  return signInWithEmailAndPassword(authFirebaseSDK, email, password).then(
    (response) => setLocalStorageData(response.user.uid)
  )
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
