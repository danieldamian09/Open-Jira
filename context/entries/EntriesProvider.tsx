import { FC, ReactNode, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import {EntriesContext, entriesReducer} from "./";
import { Entry } from '../../interfaces';
import { entriesApi } from '../../apis';
export interface EntriesState {
	entries: Entry[];
}

interface Props {
	children: ReactNode;
}

const Entries_INITIAL_STATE: EntriesState = {
	entries: [],
};

export const EntriesProvider: FC<Props> = ({children}) => {
	const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

	// Agregar nueva entrada
	const addNewEntry = (description: string) => {
		const newEntry: Entry = {
			_id: uuidv4(),
			description,
			createAt: Date.now(),
			status: 'pending'
		}

		dispatch({type: '[Entry] - Add-Entry', payload: newEntry})
	
	}

	const updateEntry = (entry:Entry) => {
		dispatch({type:'[Entry] - Entry-Update', payload: entry})
	}

	// Peticion para obtener las entradas
	const refrehEntries = async() => {
		const {data} = await entriesApi.get<Entry[]>('/entries')
		dispatch({type:'[Entry] - Refresh-Data', payload: data})
	}

	useEffect(() => {
		refrehEntries();
	}, [])
	


	return (
		<EntriesContext.Provider
			value={{
				...state,

				// Metodos
				addNewEntry,
				updateEntry,
			}}
		>
			{children}
		</EntriesContext.Provider>
	);
};
