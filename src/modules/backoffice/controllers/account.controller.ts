import { Controller, Get, UseGuards, Post } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../../shared/services/auth.service';

@Controller('v1/accounts')
export class AccountController {
    constructor(
        private readonly accountService: AccountService,
        private readonly authService: AuthService,
    ) { }

    @Post('')
    async createToken(): Promise<any> {
        return await this.authService.createToken();
    }

    @Get('')
    @UseGuards(AuthGuard())

    findAll() {
        return [];
    }
}
