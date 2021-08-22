import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStudentEntity1629517799015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE students (
            id varchar(255) NOT NULL,
            name varchar(255) NOT NULL,
            email varchar(255) NOT NULL,
            PRIMARY KEY (id)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE students`);
  }
}
