import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Customer } from '../models/customer.model';
import { Result } from '../models/result.model';

// localhost:3000/customers
@Controller('v1/customers')
export class CustomerController {
    @Get()
    get() {
        return new Result(
            true,
            null,
            [],
            null,
        );
    }

    @Get(':document')
    getById(@Param('document') document) {
        return new Result(
            true,
            null,
            {},
            null,
        );
    }

    @Post()
    post(@Body() body: Customer) {
        return new Result(
            true,
            'Cliente criado com sucesso!',
            body,
            null,
        );
    }

    @Put(':document')
    put(@Param('document') document, @Body() body) {
        return new Result(
            true,
            'Cliente atualizado com sucesso!',
            body,
            null,
        );
    }

    @Delete(':document')
    delete(@Param('document') document) {
        return new Result(
            true,
            'Cliente removido com sucesso!',
            null,
            null,
        );
    }
}
