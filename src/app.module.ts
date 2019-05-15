import { Module } from '@nestjs/common';
import { BackofficeModule } from './backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0-ijztf.mongodb.net/test?retryWrites=true'),
    BackofficeModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
