import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCustomerDto) {
    const customerExists = await this.prisma.customer.findFirst({
      where: {
        email: data.email,
      },
    });
    if (customerExists) {
      throw new BadRequestException('Customer already exists');
    }
    const created = await this.prisma.customer.create({
      data,
    });
    return created;
  }

  async findAll() {
    const customers = await this.prisma.customer.findMany();
    return customers;
  }

  async findOne(id: number) {
    const customer = await this.prisma.customer.findFirst({
      where: {
        id: id,
      },
    });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }

  async update(id: number, data: UpdateCustomerDto) {
    const customerExists = await this.prisma.customer.findFirst({
      where: {
        id: id,
      },
    });
    if (!customerExists) {
      throw new NotFoundException('Customer not found');
    }
    const updated = await this.prisma.customer.update({
      data,
      where: {
        id: id,
      },
    });
    return updated;
  }

  async remove(id: number) {
    const customerExists = await this.prisma.customer.findFirst({
      where: {
        id: id,
      },
    });
    if (!customerExists) {
      throw new NotFoundException('Customer not found');
    }
    await this.prisma.customer.delete({
      where: {
        id,
      },
    });
  }
}
