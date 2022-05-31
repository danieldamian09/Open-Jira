import { FC, ReactNode, useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';
import {EntriesContext, entriesReducer} from "./";
import { Entry } from '../../interfaces';
export interface EntriesState {
	entries: Entry[];
}

interface Props {
	children: ReactNode;
}

const Entries_INITIAL_STATE: EntriesState = {
	entries: [
		{
			_id: uuidv4(),
			description: 'Pending: Esta es la descripcion de la tarea 1',
			status: 'pending',
			createAt: Date.now()
			
		},
		{
			_id: uuidv4(),
			description: 'Progress: Esta es la descripcion de la tarea 2',
			status: 'progress',
			createAt: Date.now()-100000
			
		},
		{
			_id: uuidv4(),
			description: 'Finished: Esta es la descripcion de la tarea 3',
			status: 'finished',
			createAt: Date.now()-100
			
		},
	],
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
