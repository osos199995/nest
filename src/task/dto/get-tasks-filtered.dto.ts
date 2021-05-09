import { TaskStatus } from '../tasks-status-enum';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class GetTasksFilteredDto {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
  status: string;
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
