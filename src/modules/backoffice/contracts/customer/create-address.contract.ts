import { Contract } from '../contract';
import { Flunt } from '../../../../utils/flunt';
import { Injectable } from '@nestjs/common';
import { Address } from 'src/modules/backoffice/models/address.model';


@Injectable()
export class CreateAddressContract implements Contract {
    errors: any[];

    validate(model: Address): boolean {
        const flunt = new Flunt();

        flunt.isFixedLen(model.zipcode, 8, 'CEP inválido');
        flunt.isFixedLen(model.country, 3, 'País inválido');
        flunt.hasMinLen(model.street, 3, 'Rua inválido');
        flunt.hasMinLen(model.neighborhood, 3, 'Bairro inválido');
        flunt.hasMinLen(model.city, 3, 'Cidade inválido');
        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
