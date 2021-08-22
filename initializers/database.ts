import "reflect-metadata";
import {
  Connection,
  createConnection,
  getConnection,
  getConnectionOptions,
} from "typeorm";
import { Challenge } from "../entities/Challenge";
import { Student } from "../entities/Student";
let connection: Connection;
export const initializeDatabase = async (
  optionOverrides: Record<string, any> = {}
): Promise<Connection> => {
  if (connection) {
    console.log("reusing connection");
    return connection;
  }
  const connectionOptions = await getConnectionOptions();
  const options: any = {
    ...connectionOptions,
    entities: [Student, Challenge],
    migrations: [__dirname + "/migrations/*.ts"],
    keepConnectionAlive: true,
    ...optionOverrides,
  };

  try {
    const staleConnection = getConnection();
    await staleConnection.close();
  } catch (error) {}
  connection = await createConnection(options);

  return connection;
};

export default initializeDatabase;
