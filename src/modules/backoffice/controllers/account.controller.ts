import { Controller, Get, UseGuards, Post, Req } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { AuthService } from '../../../shared/services/auth.service';
import { JwtAuthGuard } from '../../../shared/guards/auth.guard';

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
    @UseGuards(JwtAuthGuard)
    findAll(@Req() r) {
        // tslint:disable-next-line: no-console
        console.log(r.user);
        return [];
    }
}
