import { Module } from '@nestjs/common';
import { StoreInfluxdbService } from './store-influxdb.service';

@Module({
  providers: [StoreInfluxdbService],
  exports: [StoreInfluxdbService]
})
export class StoreInfluxdbModule {}
