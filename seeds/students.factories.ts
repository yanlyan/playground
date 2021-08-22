import { Chance } from "chance";
import { getRepository } from "typeorm";
import { Student } from "../entities/Student";
const chance = new Chance();
export const StudentFactory = {
  build: (attrs: Partial<Student> = {}) => {
    const gradingStatus:
      | "UNSUBMITTED"
      | "SUBMITTED"
      | "GRADE_PASSED"
      | "GRADE_FAILED" = chance.pickone([
      "UNSUBMITTED",
      "SUBMITTED",
      "GRADE_PASSED",
      "GRADE_FAILED",
    ]);

    let grade = null;
    if (gradingStatus === "GRADE_PASSED") {
      grade = chance.integer({ min: 1, max: 4 });
    } else if (gradingStatus === "GRADE_FAILED") {
      grade = 5;
    }

    let googleDriveFolder = null;
    if (gradingStatus !== "UNSUBMITTED") {
      googleDriveFolder = chance.url({
        domain: "drive.google.com",
        protocol: "https",
      });
    }
    const studentAttrs: Partial<Student> = {
      email: chance.email(),
      name: chance.name(),
      id: chance.guid(),
      challenges: [
        {
          id: chance.guid(),
          name: chance.sentence({ words: 3 }),
          gradingStatus,
          grade,
          googleDriveFolder,
        },
      ],
      ...attrs,
    };
    return getRepository(Student).create(studentAttrs);
  },

  create: async (attrs: Partial<Student> = {}) => {
    const student = StudentFactory.build(attrs);
    console.log(student);
    const createdStudent = await getRepository(Student).save(student);
    return createdStudent;
  },

  deleteAll: async () => {
    await getRepository(Student).query(`DELETE FROM challenges`);
    await getRepository(Student).query(`DELETE FROM students`);
  },
};
