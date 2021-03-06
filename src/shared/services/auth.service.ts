import { Injectable } from '@nestjs/common';
import { AccountService } from '../../modules/backoffice/services/account.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService,
    ) { }

    async createToken() {
        const user: JwtPayload = {
            document: '02393847170',
            email: 'leo@email.com',
            image: 'assets/images/user.png',
            roles: ['admin'],
        };
        const accessToken = this.jwtService.sign(user);

        return {
            expiresIn: 3600,
            accessToken,
        };
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return payload;
        //return await this.accountService.findOneByUsername(payload.document);
    }

}
