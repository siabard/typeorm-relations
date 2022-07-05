import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactInfo } from './contact-info.entity';
import { Employee } from './employee.entity';
import { Task } from './task.entity';

@Module({
  imports: [TypeOrmModule.forRoot({entities: [Employee, Task, ContactInfo], ...config}),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
