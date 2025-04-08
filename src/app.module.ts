import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/bookstore-api'), UsersModule, AuthModule, BooksModule],
})
export class AppModule {}
