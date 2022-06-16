export const isAdmin = (email: string): boolean =>
  email === process.env.REACT_APP_ADMIN_EMAIL
