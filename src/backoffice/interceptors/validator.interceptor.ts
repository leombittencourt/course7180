import { NestInterceptor, Injectable, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contract } from '../contracts/contract';
import { Result } from '../models/result.model';

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
    constructor(public contract: Contract) {

    }

    intercept(context: ExecutionContext, next: CallHandler<any>):
        Observable<any> {
        const body = context.switchToHttp().getRequest().body;
        const valid = this.contract.validate(body);

        if (!valid) {
            return next
                .handle()
                .pipe(map(() => new Result(false, 'Ops, algo saiu errado', null, this.contract.errors), HttpStatus.BAD_REQUEST));
        }

        return next.handle();
    }
}
