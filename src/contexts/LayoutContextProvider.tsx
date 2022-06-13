import { createContext, FC, ReactNode, useContext, useState } from 'react'

interface IStateContext {
  activeMenu: boolean
  setActiveMenu: (value: boolean) => void
  closeMenuHandler: () => void
  toggleMenuHandler: () => void
}

const initialState: IStateContext = {
  activeMenu: false,
  setActiveMenu: () => {},
  closeMenuHandler: () => {},
  toggleMenuHandler: () => {},
}

const StateContext = createContext<IStateContext>(initialState)

type LayoutContextProviderProps = {
  children: ReactNode
}

export const LayoutContextProvider: FC<LayoutContextProviderProps> = ({
  children,
}) => {
  const [activeMenu, setActiveMenu] = useState<boolean>(false)

  const closeMenuHandler = (): void => {
    setActiveMenu(false)
  }
  const toggleMenuHandler = (): void => {
    setActiveMenu(!activeMenu)
  }

  return (
    <StateContext.Provider
      value={{ activeMenu, setActiveMenu, closeMenuHandler, toggleMenuHandler }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useLayoutStateContext = () => useContext(StateContext)
