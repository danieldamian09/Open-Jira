import {EntriesState} from "./";
import {Entry} from "../../interfaces";

type EntriesActionType =
	| {type: "[Entry] - Add-Entry"; payload: Entry}
	| { type: "[Entry] - Entry-Update"; payload: Entry }
	| { type: "[Entry] - Refresh-Data"; payload: Entry[] }
	

export const entriesReducer = (
	state: EntriesState,
	action: EntriesActionType
): EntriesState => {
	switch (action.type) {
		case "[Entry] - Add-Entry":
			return {
				...state,
				entries: [...state.entries, action.payload],
			};

		case "[Entry] - Entry-Update":
			return {
				...state,
				entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            // indicar las propiedades que voy a cambiar del Entry que recibo por payload
            entry.status = action.payload.status;
            entry.description = action.payload.description;
					}
					return entry;
				}),
			};
		
		case '[Entry] - Refresh-Data':
			return {
				...state,
				entries: [...action.payload], // creo un nuevo array con los datos que recibo por payload
			}

		default:
			return state;
	}
};
