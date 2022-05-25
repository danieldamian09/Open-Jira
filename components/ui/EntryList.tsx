import React, {FC, useContext, useMemo} from "react";
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

	// overflowY: 'scroll',

	return (
		// TODO: aqui haremos drop
		<div>
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
