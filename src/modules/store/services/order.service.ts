import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {

    constructor(@InjectRepository(Order) private readonly repository: Repository<Order>) {}

    // tslint:disable-next-line: variable-name
    async getByNumber(number: string): Promise<Order> {
        return await this.repository.findOne({ number });
    }

    async getByCustomer(customer: string): Promise<Order[]> {
        return await this.repository.find({ customer });
    }

    async post(order: Order) {
        await this.repository.save(order);
    }

}
