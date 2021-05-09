import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { TaskStatus } from '../tasks-status-enum';
import any = jasmine.any;

export class taskStatusValidationPipes implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    console.log('value', value);
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is not invalid status`);
    }
    return value;
  }
  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
