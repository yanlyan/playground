import { MigrationInterface, QueryRunner } from "typeorm";

export class AddChallengeEntity1629527265953 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE challenge (
            id varchar(255) NOT NULL DEFAULT '',
            studentId varchar(255) NOT NULL DEFAULT '',
            name varchar(255) NOT NULL DEFAULT '',
            googleDriveFolder varchar(255) DEFAULT NULL,
            gradingStatus enum('UNSUBMITTED','SUBMITTED','GRADE_PASSED','GRADE_FAILED') NOT NULL DEFAULT 'UNSUBMITTED',
            grade int(10) unsigned DEFAULT NULL,
            reviewerId varchar(255) DEFAULT NULL,
            PRIMARY KEY (id),
            KEY studentId (studentId),
            KEY reviewerId (reviewerId),
            CONSTRAINT challenge_ibfk_1 FOREIGN KEY (studentId) REFERENCES students (id),
            CONSTRAINT challenge_ibfk_2 FOREIGN KEY (reviewerId) REFERENCES students (id)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE challenge
      `);
  }
}
