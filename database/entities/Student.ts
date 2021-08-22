import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Challenge } from "./Challenge";

@Entity({
  name: "students",
})
export class Student {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "varchar", nullable: false })
  public name: string;

  @Column({ type: "varchar", nullable: false })
  public email: string;

  @OneToMany(() => Challenge, (challenge) => challenge.student, {
    nullable: true,
    cascade: ["insert", "update"],
  })
  public challenges?: Challenge[];
}
