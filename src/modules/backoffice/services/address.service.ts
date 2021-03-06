import { Model } from 'mongoose';
import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../models/customer.model';
import { AddressType } from '../enums/address-type.enum';
import { Address } from '../models/address.model';

@Injectable()
export class AddressService {
    constructor(
        @InjectModel('Customer') private readonly model: Model<Customer>) { }

    async create(document: string, data: Address, type: AddressType): Promise<Customer> {
        const options = { upsert: true }; // new: true, setDefaultsOnInsert: true };
        if (type === AddressType.Billing) {
            return await this.model.findOneAndUpdate({ document }, {
                $set: {
                    billingAddress: data,
                },
            }, options);
        } else {
            return await this.model.findOneAndUpdate({ document }, {
                $set: {
                    shippingAddress: data,
                },
            }, options);
        }
    }

    // getAddressByZipCode(zipcode: string) {
    //     const url = `https://viacep.com.br/ws/${zipcode}/json/`;
    //     return this.httpService.get(url);
    // }
}
