import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './tasks-status-enum';
import { GetTasksFilteredDto } from "./dto/get-tasks-filtered.dto";
import { User } from "../auth/user.entity";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private TaskRepository: TaskRepository,
  ) {}

  // private tasks: Task[] = [];
    getTasks(fileterDto: GetTasksFilteredDto,
             User:User): Promise<Task[]> {
    return this.TaskRepository.getTasks(fileterDto,User);
  }
  //
    getFilterTask(filterDto:GetTasksFilteredDto){
      // const {status,search} = filterDto;
      // let tasks= this.getTasks();
      // if (status){
      //   tasks = tasks.filter(task=> task.status === status)
      }
  //     if (search){
  //       tasks = tasks.filter(tasks=>
  //       tasks.title.includes(search)||
  //       tasks.description.includes(search))
  //     }
  //
  //     return tasks;
  //   }
  async getTaskById(id: number,User: User): Promise<Task> {
    const found = await this.TaskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`this ${id} is not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    // const { title, description } = createTaskDto;
    // const task = new Task();
    // task.title = title;
    // task.description = description;
    // task.status = TaskStatus.OPEN;
    // await task.save();
    // return task;
    return this.TaskRepository.createTask(createTaskDto, user);
  }

  //   getTaskById(id: string) : Task {
  // return this.tasks.find(task=>task.id === id);
  //   }
  async deleteTask(id: number): Promise<void> {
    const deleted = await this.TaskRepository.delete(id);
    if (deleted.affected === 0)
      throw new NotFoundException(`this ${id} is not found`);
    // return ;
  }
  //   deleteTask(id:string){
  //     const found = this.getTaskById(id);
  //     this.tasks = this.tasks.filter(task=> task.id === found.id);
  //   }
  //
  // createTask (createTskDto : CreateTaskDto): Task{
  // const {title,description} = createTskDto;
  // const task:Task = {
  //   id: uuidv1(),
  //   title,
  //   description,
  //       status: TaskStatus.OPEN,
  // };
  //
  // this.tasks.push(task);
  // return task;
  // }
  //
  async updateTask(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
  //   updateTask(id: string, status: TaskStatus): Task {
  //     const task = this.getTaskById(id);
  //     if (!task) {
  //       task.status = status;
  //     }
  //
  //     return task;
  // }
}
