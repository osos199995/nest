import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
// import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilteredDto } from './dto/get-tasks-filtered.dto';
import { Validator } from 'class-validator';
import { taskStatusValidationPipes } from './pipes/task-status-validation.pipes';
import { Task } from './task.entity';
import { TaskStatus } from './tasks-status-enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilteredDto,
    @GetUser() User: User,
  ): Promise<Task[]> {
    return this.taskService.getTasks(filterDto, User);
  }

  //
  @Get('/:id')
  getTaskById(@Param('id') id: number,User: User): Promise<Task> {
    return this.taskService.getTaskById(id,User);
  }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   const found = this.taskService.getTaskById(id);
  //   if (!found) {
  //     throw new NotFoundException(`this ${id} not Found`);
  //   }
  //   return found;
  // }
  //
  @Post()

  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {

    console.log(user)
    return this.taskService.createTask(createTaskDto, user);
  }
  //
  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }
  //
  @Patch('/:id/status')
  updateTask(
    @Param('id') id: number,
    @Body('status', taskStatusValidationPipes) status: TaskStatus,
  ): Promise<Task> {
    return this.taskService.updateTask(id, status);
  }
}
