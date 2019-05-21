import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.model';
import { QueryDto } from '../dtos/query.dto';

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) {

    }

    async create(data: Customer): Promise<Customer> {
        const user = this.model(data);
        return await user.save();
    }

    async findAll(): Promise<Customer[]> {
        return await this.model
            .find({}, 'name email document')
            .sort('name')
            .exec();
    }

    async find(document): Promise<Customer> {
        return await this.model
            .find({ document })
            .polulate('user', 'username')
            .exec();
    }

    async query(model: QueryDto): Promise<Customer[]> {
        return await this.model
            .find(model.query,
                model.fields,
                {
                    skip: model.skip,
                    limit: model.take,
                })
            .sort(model.sort)
            .exec();
    }
}
