import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';

import { AccountService } from './services/account.service';
import { CustomerService } from './services/customer.service';
import { AddressService } from './services/address.service';
import { PetService } from './services/pet.service';

import { AccountController } from './controllers/account.controller';
import { CustomerController } from './controllers/customer.controller';
import { AddressController } from './controllers/address.controller';
import { PetController } from './controllers/pet.controller';

import { AuthService } from '../../shared/services/auth.service';
import { JwtStrategy } from '../../shared/strategies/jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: '54147AABB310e',
            signOptions: {
                expiresIn: 3600,
            },
        }),
        MongooseModule.forFeature(
            [
                {
                    name: 'Customer',
                    schema: CustomerSchema,
                },
                {
                    name: 'User',
                    schema: UserSchema,
                },
            ]),
    ],
    controllers: [AccountController, AddressController, CustomerController, PetController],
    providers: [AccountService, AddressService, CustomerService, PetService, AuthService, JwtStrategy],
})
export class BackofficeModule {

}
