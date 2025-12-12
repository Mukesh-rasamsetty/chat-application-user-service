import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

const defaultMongoUri =
  'mongodb+srv://chat-application:bTfUJ9rn5XLu4xXM@cluster0.eocngmj.mongodb.net/?appName=Cluster0&retryWrites=true&w=majority';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI ?? defaultMongoUri),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
