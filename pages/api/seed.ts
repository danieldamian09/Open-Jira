import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../database'
import { Entry } from '../../models'

type Data = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  
  // Si esta en produccion no se va a ejecutar "para no purgar la base de datos en produccion"
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ message: 'No tiene acceso a este servicio' })
  }

  await db.connect();
  // Aca podemos hacer la interaccion con la base de datos
  await Entry.deleteMany(); // Borrar todos los registros ojo en produccion
  await Entry.insertMany(seedData.entries);


  await db.disconnect();


  res.status(200).json({ message: 'Proceso realizado correctamente' })
}