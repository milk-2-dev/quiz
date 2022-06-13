import { useAppSelector } from './redux'

export function useAuth() {
  const { isAuth, token } = useAppSelector((state) => state.auth)

  return {
    token,
    isAuth,
  }
}
