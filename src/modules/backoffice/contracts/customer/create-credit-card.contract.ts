import { Contract } from '../contract';
import { CreditCard } from '../../models/credit-card.model';
import { Flunt } from '../../../../utils/flunt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateCreditCardContract implements Contract {
    errors: any[];

    validate(model: CreditCard): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.holder, 5, 'Nome no cartão inválido');
        flunt.isFixedLen(model.number, 16, 'Número do cartão inválido');
        flunt.isFixedLen(model.expiration, 4, 'Data de expiração do cartão inválida');

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}