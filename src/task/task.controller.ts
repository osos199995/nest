import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilteredDto } from './dto/get-tasks-filtered.dto';
import { Validator } from 'class-validator';
import { taskStatusValidationPipes } from './pipes/task-status-validation.pipes';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilteredDto): Task[] {
    return this.taskService.getFilterTask(filterDto);
  }

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    const found = this.taskService.getTaskById(id);
    if (!found) {
      throw new NotFoundException(`this ${id} not Found`);
    }
    return found;
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  @UsePipes(ValidationPipe)
  deleteTask(@Param('id') id: string): void {
    const found = this.taskService.getTaskById(id);
    if (!found) {
      throw new NotFoundException(`this ${id} not Found`);
    }
    this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body('status', taskStatusValidationPipes) status: TaskStatus,
  ): Task {
    return this.taskService.updateTask(id, status);
  }
}
