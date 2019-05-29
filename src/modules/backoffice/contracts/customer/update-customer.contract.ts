import { Injectable } from '@nestjs/common';
import { Contract } from '../contract';
import { UpdateCustomerDto } from '../../dtos/customer/update-customer.dto';
import { Flunt } from '../../../../utils/flunt';


@Injectable()
export class UpdateCustomerContract implements Contract {
    errors: any[];

    validate(model: UpdateCustomerDto): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 5, 'Nome inválido');

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
