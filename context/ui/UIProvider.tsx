import {FC, ReactNode, useReducer} from "react";
import {UIContext, uiReducer} from "./";
export interface UIstate {
	sidemenuOpen: boolean;
	isAddingEntry: boolean;
}

interface Props {
	children: ReactNode;
}

const UI_INITIAL_STATE: UIstate = {
	sidemenuOpen: false,
	isAddingEntry: false,
};

export const UIProvider: FC<Props> = ({children}) => {
	const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

	const openSideMenu = () => {
		dispatch({type: '[UI] - Open Sidebar'});
	}

	const closeSideMenu = () => {
		dispatch({type: '[UI] - Close Sidebar'});
	}

	const setIsAddingEntry = (isAdding: boolean) => {
		dispatch({type:'[UI] - Set IsAddingEntry', payload: isAdding});
	}

	return (
		<UIContext.Provider
			value={{
				...state,

				// Methods
				openSideMenu,
				closeSideMenu,
				
				setIsAddingEntry,
			}}
		>
			{children}
		</UIContext.Provider>
	);
};
