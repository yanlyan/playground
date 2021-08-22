import initializeDatabase from "../init";
import { StudentFactory } from "./students.factories";

const run = async (): Promise<any> => {
  console.log("Connecting to DB");
  const connection = await initializeDatabase({ migrationsRun: false });

  console.log("Seeding DB");
  await StudentFactory.deleteAll();

  console.log("Closing DB");
  return await connection.close();
};

run();
