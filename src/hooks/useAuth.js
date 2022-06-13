import { useAppSelector } from './redux'

export function useAuth() {
  const { isAuth } = useAppSelector((state) => state.auth)

  return {
    isAuth,
  }
}
