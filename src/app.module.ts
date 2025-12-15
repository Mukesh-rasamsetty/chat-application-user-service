import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from './users/auth/auth.guard';
import { UsersModule } from './users/users.module';

const defaultMongoUri =
  'mongodb+srv://chat-application:bTfUJ9rn5XLu4xXM@cluster0.eocngmj.mongodb.net/?appName=Cluster0&retryWrites=true&w=majority';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI ?? defaultMongoUri),
    UsersModule,
  ],
  controllers: [],
  providers: [{ provide: 'APP_GUARD', useClass: AuthGuard }],
})
export class AppModule {}
