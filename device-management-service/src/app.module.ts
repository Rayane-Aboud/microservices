import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AssetsModule } from './assets/assets.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesModule } from './devices/devices.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:password@mongo:27017', {
      
    }),
    DevicesModule,
    AssetsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
