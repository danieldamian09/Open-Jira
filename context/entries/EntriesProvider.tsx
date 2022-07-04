import {FC, ReactNode, useReducer, useEffect} from "react";
import {useSnackbar} from "notistack";
import {EntriesContext, entriesReducer} from "./";
import {Entry} from "../../interfaces";
import {entriesApi} from "../../apis";
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
	const {enqueueSnackbar} = useSnackbar();

	// Agregar nueva entrada
	const addNewEntry = async (description: string) => {
		// Para agregar la nueva entreda solo desde el frontend
		// const newEntry: Entry = {
		// 	_id: uuidv4(),
		// 	description,
		// 	createdAt: Date.now(),
		// 	status: 'pending'
		// }

		// Para agregar la nueva entreda por medio de la API: pages/api/entries/index.ts
		// Si este codigo falla no va a actualizar el state
		const {data} = await entriesApi.post<Entry>("/entries", {description});
		// Si este codigo falla no va a actualizar el state puede ser porque no este levantada la base de datos

		dispatch({type: "[Entry] - Add-Entry", payload: data});
	};

	// Actualizar entrada
	const updateEntry = async (
		{_id, description, status}: Entry,
		showSnackbar : boolean = false 
	) => {
		try {
			// Hago el envio al endpoint que me retorna la entrada actualizada "Toda la data en el cuerpo" por ID por medio de un PUT
			const {data} = await entriesApi.put<Entry>(`/entries/${_id}`, {
				description,
				status,
			});
			// Actualiza la entrda en el frontend
			dispatch({type: "[Entry] - Entry-Update", payload: data});

			//TODO: mostar el snackbar de que se actualizo la entrada
			if (showSnackbar) {
				enqueueSnackbar("Se actualizo la entrada", {
					variant: "success",
					autoHideDuration: 1500,
					anchorOrigin: {
						vertical: "top",
						horizontal: "right",
					},
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Peticion para obtener las entradas
	const refrehEntries = async () => {
		const {data} = await entriesApi.get<Entry[]>("/entries");
		dispatch({type: "[Entry] - Refresh-Data", payload: data});
	};

	useEffect(() => {
		refrehEntries();
	}, []);

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
