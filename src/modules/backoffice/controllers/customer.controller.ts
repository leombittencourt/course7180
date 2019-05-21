import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from '../../../interceptors/validator.interceptor';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contract';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';
import { Address } from '../models/address.model';
import { CreateAddressContract } from '../contracts/customer/create-address.contract';
import { CreatePetContract } from '../contracts/customer/create-pet.contract';
import { Pet } from '../models/pet.model';
import { QueryDto } from '../dtos/query.dto';
import { PetService } from '../services/pet.service';
import { AddressService } from '../services/address.service';
import { AddressType } from '../enums/address-type.enum';


// localhost:3000/customers
@Controller('v1/customers')
export class CustomerController {

    constructor(
        private readonly accountService: AccountService,
        private readonly customerService: CustomerService,
        private readonly petService: PetService,
        private readonly addressService: AddressService) {
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() model: CreateCustomerDto) {
        try {
            const user = await this.accountService.create(new User(model.document, model.password, true));
            const customer = new Customer(model.name, model.document, model.email, [], null, null, null, user);
            const res = await this.customerService.create(customer);
            return new Result('Cliente criado com sucesso!', true, res, null);
        } catch (error) {
            //Roolback manual
            throw new HttpException(new Result('Não foi possível realizar seu cadastro!', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/addresses/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillingAddress(@Param('document') document, @Body() model: Address) {
        try {
            await this.addressService.create(document, model, AddressType.Billing);
            return new Result(null, false, model, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível adicionar seu endereço!', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/addresses/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShippingAddress(@Param('document') document, @Body() model: Address) {
        try {
            await this.addressService.create(document, model, AddressType.Shipping);
            return new Result(null, false, model, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível adicionar seu endereço!', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/pets')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async createPet(@Param('document') document, @Body() model: Pet) {
        try {
            await this.petService.create(document, model);
            return new Result(null, true, model, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível adicionar seu pet!', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':document/pets/:id')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async updatePet(@Param('document') document, @Param('id') id, @Body() model: Pet) {
        try {
            await this.petService.update(document, id, model);
            return new Result(null, true, model, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível atualizar seu pet!', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async getAll() {
        const customers = await this.customerService.findAll();
        return new Result(null, true, customers, null);
    }

    @Get(':document')
    async get(@Param('document') document) {
        const customer = await this.customerService.find(document);
        return new Result(null, true, customer, null);
    }

    @Post('query')
    async query(@Body() model: QueryDto) {
        const customers = await this.customerService.query(model);
        return new Result(null, true, customers, null);
    }
}
