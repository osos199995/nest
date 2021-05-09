import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// @ts-ignore
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true,
};
