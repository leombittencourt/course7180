import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

// localhost:3000/customers
@Controller('v1/customers')
export class CustomerController {
    @Get()
    get() {
        return 'Obter os clientes';
    }
    @Post()
    post() {
        return 'Criar um cliente';
    }
    @Put()
    put() {
        return 'Atualizar um cliente';
    }
    @Delete()
    delete() {
        return 'Apagar um cliente';
    }
}
