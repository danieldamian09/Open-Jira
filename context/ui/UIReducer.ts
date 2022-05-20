import {UIstate} from "./";

type UIActionType =
	| {type: "[UI] - Open Sidebar"}
	| {type: "[UI] - Close Sidebar"};

export const uiReducer = (state: UIstate, action: UIActionType): UIstate => {
	switch (action.type) {
		case "[UI] - Open Sidebar":
			return {...state, sidemenuOpen: true};

		case "[UI] - Close Sidebar":
			return {...state, sidemenuOpen: false};

		default:
			return state;
	}
};
