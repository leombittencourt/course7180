import { Controller, Get, UseGuards } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/shared/services/auth.service';

@Controller('v1/accounts')
export class AccountController {
    constructor(
        private readonly accountService: AccountService,
        private readonly authService: AuthService,
    ) { }

    @Get('')
    @UseGuards(AuthGuard())

    findAll() {
        return [];
    }
}
