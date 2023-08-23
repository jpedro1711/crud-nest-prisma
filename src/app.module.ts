import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { CustomersController } from './customers/customers.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
