// @ts-ignore : 'Column' is declared but its value is never read.
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

}
