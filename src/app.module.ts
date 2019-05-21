import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from './modules/backoffice/backoffice.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0-ijztf.mongodb.net/test?retryWrites=true'),
    BackofficeModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
