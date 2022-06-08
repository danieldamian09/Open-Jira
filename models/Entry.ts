import mongoose, {Model, Schema} from "mongoose";
import {Entry} from "../interfaces";

export interface IEntry extends Entry {}

const entrySchema = new Schema({
	// Definir todas las propiedades que mis documentos van a tener
	description: {type: String, required: true},
	createdAt: {type: Number},
	status: {
		type: String,
		enum: {
			values: ["pending", "in-progress", "finished"],
			message: "{VALUE} no es un estado permitido",
		},
		default: "pending",
	},
});

// Si ya esta defino el esqueno no es necesario volver a definir el esquema porque ya lo tengo:
const EntryModel: Model<IEntry> =
	mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default EntryModel;
