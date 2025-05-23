import { Module } from '@nestjs/common';
import {TodoModule} from "./todo/todo.module";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: './database.sqlite',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      TodoModule,
  ],
})
export class AppModule {}
