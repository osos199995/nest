import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
// @ts-ignore
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilteredDto } from "./dto/get-tasks-filtered.dto";
@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getFilterTask(filterDto:GetTasksFilteredDto):Task[]{
    const {status,search} = filterDto;
    let tasks= this.getAllTasks();
    if (status){
      tasks = tasks.filter(task=> task.status === status)
    }
    if (search){
      tasks = tasks.filter(tasks=>
      tasks.title.includes(search)||
      tasks.description.includes(search))
    }

    return tasks;
  }
  getTaskById(id: string) : Task {
return this.tasks.find(task=>task.id === id);
  }
  deleteTask(id:string){
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task=> task.id === found.id);
  }

createTask (createTskDto : CreateTaskDto): Task{
const {title,description} = createTskDto;
const task:Task = {
  id: uuidv1(),
  title,
  description,
      status: TaskStatus.OPEN,
};

this.tasks.push(task);
return task;
}


  updateTask(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    if (!task) {
      task.status = status;
    }

    return task;
}



}
