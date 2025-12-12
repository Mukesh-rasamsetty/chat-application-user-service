import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaModule } from './users/schemas/schema.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI ?? ''),
    UsersModule,
    SchemaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
