import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks-status-enum';
import { GetTasksFilteredDto } from './dto/get-tasks-filtered.dto';
import { User } from '../auth/user.entity';
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterdto: GetTasksFilteredDto, User: User): Promise<Task[]> {
    const { status, search } = filterdto;
    const query = this.createQueryBuilder('task');
    query.where('task.userId = :userId', { userId: User.id });
    if (status) {
      query.andWhere('task.status =:status', { status });
    }
    if (search) {
      query.andWhere(
        'task.title Like :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }
  async createTask(createTaskDto: CreateTaskDto, User: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.User = User;
    await task.save();
    return task;
  }
}
