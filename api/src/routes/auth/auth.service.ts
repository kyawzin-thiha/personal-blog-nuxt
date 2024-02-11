import { HttpException, Injectable } from '@nestjs/common';
import { AccountRepository } from '../../db/account.repository';
import { BcryptService } from '../../helper/bcrypt.service';
import { JwtTokenService } from '../../helper/jwt.service';

@Injectable()
export class AuthService {
	constructor(private readonly account: AccountRepository, private readonly bcrypt: BcryptService, private readonly jwt: JwtTokenService) {}

	async login(identifier: string, password: string) {
		const [account, dbError] = await this.account.find(identifier);
		if (dbError) throw new HttpException(dbError.message, dbError.status);

		const isPasswordMatch = this.bcrypt.compare(password, account.password);

		if (!isPasswordMatch) throw new HttpException('Invalid Password', 401);

		const payload = {
			id: account.id,
			user: account.user.id,
			email: account.email,
		};

		return this.generateToken(payload);
	}

	private generateToken(payload: any) {
		const [token, error] = this.jwt.sign(payload);
		if (error) throw new HttpException(error.message, error.status);
		return token;
	}
}
