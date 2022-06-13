export const isAdmin = (): boolean => {
  const userMail = localStorage.getItem('email')

  return userMail === process.env.REACT_APP_ADMIN_EMAIL
}
