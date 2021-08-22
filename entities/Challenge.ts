import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Student } from "./Student";

@Entity({
  name: "challenges",
})
export class Challenge {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "varchar", nullable: false })
  public name: string;

  @Column({ type: "varchar", nullable: true })
  public googleDriveFolder?: string;

  @Column({ type: "varchar", nullable: false })
  public gradingStatus?:
    | "UNSUBMITTED"
    | "SUBMITTED"
    | "GRADE_PASSED"
    | "GRADE_FAILED";

  @Column({ type: "int", nullable: true })
  grade?: number;

  @Column({ type: "int" })
  reviewerId?: number;

  @Column({ type: "int" })
  studentId?: number;

  @ManyToOne(() => Student, (student) => student.challenges)
  student?: Student;

  @OneToOne(() => Student)
  @JoinColumn({ name: "reviewerId" })
  reviewer?: Student;
}
