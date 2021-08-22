import initializeDatabase from "../initializers/database";
import { seed as studentSeeds } from "./students.seed";
const seed = async (): Promise<any> => {
  await studentSeeds();
};

const run = async (): Promise<any> => {
  console.log("Connecting to DB");
  const connection = await initializeDatabase({ migrationsRun: false });

  console.log("Seeding DB");
  await seed();

  console.log("Closing DB");
  return await connection.close();
};

run();
