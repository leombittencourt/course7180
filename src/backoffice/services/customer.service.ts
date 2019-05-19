import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.model';
import { Address } from '../models/address.model';

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) {

    }

    async create(data: Customer): Promise<Customer> {
        const user = this.model(data);
        return await user.save();
    }

    async addBillingAddress(document: string, data: Address): Promise<Customer> {
        const options = { upsert: true }; // new: true, setDefaultsOnInsert: true };
        return await this.model.findOneAndUpdate({ document }, {
            $set: {
                billingAddress: data,
            },
        }, options);
    }
}
