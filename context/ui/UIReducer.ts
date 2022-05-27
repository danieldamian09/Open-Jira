import {UIstate} from "./";

type UIActionType =
	| {type: "[UI] - Open Sidebar"}
	| { type: "[UI] - Close Sidebar" }
	| { type: "[UI] - Set IsAddingEntry", payload: boolean }


export const uiReducer = (state: UIstate, action: UIActionType): UIstate => {
	switch (action.type) {
		case "[UI] - Open Sidebar":
			return {...state, sidemenuOpen: true};

		case "[UI] - Close Sidebar":
			return { ...state, sidemenuOpen: false };
		
		case "[UI] - Set IsAddingEntry":
			return { ...state, isAddingEntry: action.payload };

		default:
			return state;
	}
};
