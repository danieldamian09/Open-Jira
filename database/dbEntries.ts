import { isValidObjectId } from 'mongoose';
import { db } from './';
import { Entry, IEntry } from '../models';


export const getEntrieByID = async (id: string): Promise<IEntry | null> => {
  
  // Validacion si el id es un id de mongo
  if (!isValidObjectId(id)) return null;

  await db.connect();
  // Buscar el id en la base de datos y guardarlo en una variable, lean nos permite traer solo la informacion necesaria
  const entry = await Entry.findById(id).lean();
  await db.disconnect();

  // Evitar la serealizacion del id que viene de mongo
  return JSON.parse(JSON.stringify(entry));

}