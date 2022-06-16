import { useAppSelector } from './redux'

export function useAuth() {
  const { isAuth, isAdmin } = useAppSelector((state) => state.auth)

  return {
    isAuth,
    isAdmin,
  }
}
