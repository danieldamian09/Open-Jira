// Para llenar la base de datos en desarrollo
interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
	description: string;
	status: string;
	createdAt: number;
}

export const seedData: SeedData = {
	entries: [
		{
			description: "Pending: Esta es la descripcion de la tarea 1",
			status: "pending",
			createdAt: Date.now(),
		},
		{
			description: "Progress: Esta es la descripcion de la tarea 2",
			status: "in-progress",
			createdAt: Date.now() - 100000,
		},
		{
			description: "Finished: Esta es la descripcion de la tarea 3",
			status: "finished",
			createdAt: Date.now() - 100,
		},
	],
};
