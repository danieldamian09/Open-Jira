import { createContext } from 'react';


interface ContextProps {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDraging: boolean;

  // Methods
  openSideMenu: () => void;
  closeSideMenu: () => void;
  
  setIsAddingEntry: (isAdding: boolean) => void;

  startDraging: () => void;
  endDraging: () => void;
}


export const UIContext = createContext({} as ContextProps);