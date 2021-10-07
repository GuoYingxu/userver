import { Entity ,Column,PrimaryGeneratedColumn,BeforeInsert, BeforeUpdate} from "typeorm";

export abstract class BasedIdEntity {
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  created_at:Date

  @BeforeInsert()
  insertDates() {
    this.created_at = new Date();
  }
}