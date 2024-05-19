import { Module } from '@nestjs/common';
import { RetrieveFromInfluxdbService } from './retrieve-from-influxdb.service';

@Module({
    providers: [RetrieveFromInfluxdbService],
    exports: [RetrieveFromInfluxdbService], 
})
export class RetrieveFromInfluxdbModule {}
