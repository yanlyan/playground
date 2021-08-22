import { StudentFactory } from "./students.factories";

export const seed = async (): Promise<any> => {
  const students = [];

  for (let i = 0; i < 100; i++) {
    students.push({});
  }

  try {
    console.log("Seeding dummy student data...");
    const usersPromises = students.map((student) =>
      StudentFactory.create(student)
    );

    const userResults = await Promise.all(usersPromises);
    console.log("Done seeding students.");

    return userResults;
  } catch (e) {
    console.error("ERROR - Students: ", e);
  }
};
