import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { StoreModule } from './modules/store/store.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0-ijztf.mongodb.net/test?retryWrites=true'),
    BackofficeModule,
    StoreModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
