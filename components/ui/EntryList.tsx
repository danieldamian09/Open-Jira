import React, {DragEvent, FC, useContext, useMemo} from "react";
import {List, Paper} from "@mui/material";
import {EntryCard} from "./";
import {EntryStatus} from "../../interfaces";
import {EntriesContext} from "../../context/entries/";

interface Props {
	status: EntryStatus;
}

export const EntryList: FC<Props> = ({status}) => {
	const {entries} = useContext(EntriesContext);

	// Filtar las entradas por el estado
	const entriesByStatus = useMemo(
		() => entries.filter((entry) => entry.status === status),
		[entries]
	);

	// Drag and drop
	const allowDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
		// console.log(event);
		// * Extraer el ID que le asignamos al elemento arrastrado "text" en el onDragStart
		const id = event.dataTransfer.getData("text");
		console.log(id);
	};

	return (
		// TODO: aqui haremos drop
		<div onDrop={onDropEntry} onDragOver={allowDrop}>
			<Paper
				sx={{
					height: "calc(100vh - 180px)",
					overflowY: "scroll",
					backgroundColor: "transparent",
					padding: "1px 5px",
				}}
			>
				{/* TODO: cambiara si estoy haciano drag o no */}
				<List sx={{opacity: "1"}}>
					{entriesByStatus.map((entry) => (
						<EntryCard key={entry._id} entry={entry} />
					))}
				</List>
			</Paper>
		</div>
	);
};
