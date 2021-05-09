import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from './tasks-status-enum';
import { User } from '../auth/user.entity';
@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne((type) => User, (User) => User.tasks, { eager: false })
  User: User;

  @Column()
  userId: number;
}
