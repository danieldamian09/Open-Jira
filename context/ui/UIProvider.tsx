import { FC, ReactNode, useReducer } from 'react';
import { UIContext, UIREducer } from './';
export interface UIstate {
  sidemenuOpen: boolean;
}

interface Props {
  children: ReactNode;
}

const UI_INITIAL_STATE: UIstate = {
  sidemenuOpen: false,
}

export const UIProvider: FC<Props> = ({ children }) => {
  
  const [state, dispatch] = useReducer(UIREducer, UI_INITIAL_STATE);

  return (
    <UIContext.Provider value={{
      sidemenuOpen: false
    }}>
      {children}
    </UIContext.Provider>
  )
}
