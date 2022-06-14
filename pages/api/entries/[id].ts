import mongoose from "mongoose";
import type {NextApiRequest, NextApiResponse} from "next";
import {db} from "../../../database";
import {Entry, IEntry} from "../../../models";

type Data = {message: string} | IEntry;

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	// Como ver el id que me esta llegando en el request
	// console.log(req.query)
	const {id} = req.query;

	// Obtener la entrada segun el ID

	// Validaciones antes de llegar a la base de datos (para cualquier peticion)
	if (!mongoose.isValidObjectId(id)) {
		// Si el id es valido no es valido
		return res.status(400).json({message: "El id no es valido " + id});
	}

	switch (req.method) {
		case "PUT":
			return upDateEntry(req, res);

		default:
			return res.status(400).json({message: "Metodo no existe"});
	}
}


// Actualizar una entrada
const upDateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

	const {id} = req.query;

	await db.connect();

	// Confirmar si existe una entrada con ese id
	const entryUpDate = await Entry.findById(id);

	// En caso de que no exista una entrada con ese id
	if (!entryUpDate) {
		await db.disconnect();
		return res
			.status(400)
			.json({message: "No existe una entrada con ese id" + id});
	}

	// Este endponint nos permite actualizar la descripcion de la entrada y el estado
	// Si la description y el estado no viene en el request, tomar el valor de la entrada que esta en entryUpDate
	const {description = entryUpDate.description, status = entryUpDate.status} =
		req.body;
	
	try {
			// Actualizar la entrada
	const upDateEntry = await Entry.findByIdAndUpdate(
		id,
		{description, status},
		{runValidators: true, new: true}
		);
		await db.disconnect();
		res.status(200).json(upDateEntry!);

	// Otra forma de actualizar la entrada
	// entryUpDate.description = description;
	// entryUpDate.status = status;
	// await entryUpDate.save();
	} catch (error: any) {
		console.log(error);
		await db.disconnect();
		res.status(400).json({message: error.errors.status.message});
	}

	
};
