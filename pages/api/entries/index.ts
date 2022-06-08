import type {NextApiRequest, NextApiResponse} from "next";
import {db} from "../../../database";
import {Entry} from "../../../models";
import {IEntry} from "../../../models";

type Data = {message: string} | IEntry[] | IEntry;

// Endpont: /api/entries para leer la base de datos

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case "GET":
			return getEntries(res);

		case "POST":
			return postEntry(res, req);
		
		default:
			return res.status(400).json({message: "Endpoint no existe"});
	}
}

const getEntries = async (res: NextApiResponse<Data>) => {
	// Leer la base de datos
	await db.connect();

	const entries = await Entry.find().sort({createdAt: "ascending"});

	await db.disconnect();

	res.status(200).json(entries);
};

const postEntry = async (res: NextApiResponse<Data>, req: NextApiRequest) => {

	const { description = '' } = req.body;

	// Crear la nueva entrada segun el modelo que ya tengo definido
	const newEntry = new Entry({
		description,
		createdAt: new Date(),
	})

	// Guardar en la base de datos "hacemos en un try catch por si falla algo"
	try {
		await db.connect();
		// insertamos la nueva entry en la base de datos
		await newEntry.save();
		await db.disconnect();

		return res.status(201).json(newEntry);
		
	} catch (error) {
		await db.disconnect();
		console.log(error);

		return res.status(400).json({message: "Algo salio mal, revisar consola del servidor"});
	}
	

};