import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { StoreModule } from './modules/store/store.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0-ijztf.mongodb.net/test?retryWrites=true'),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: '7180',
    //   password: '1q2w3e4r!@#$',
    //   database: '7180',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    // }),
    BackofficeModule,
    StoreModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
