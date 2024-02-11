import { Body, Controller, Get, Post, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Public } from '../../decorators/type.decorator';

@Controller('auth')
export class AuthController {
	constructor(private readonly auth: AuthService, private readonly configService: ConfigService) {}

	@Get('/authenticate')
	reAuth() {
		return true;
	}

	@Public()
	@Post('login')
	async login(@Body() data: { identifier: string, password: string }, @Response({ passthrough: true }) response: any) {
		const token = this.auth.login(data.identifier, data.password);

		response.cookie('token', token, {
			httpOnly: this.configService.get('NODE_ENV') === 'production',
			sameSite: 'none',
			secure: this.configService.get('NODE_ENV') === 'production',
			domain: this.configService.get('NODE_ENV') === 'production' ? this.configService.get('COOKIE_DOMAIN') : undefined,
			maxAge: 1000 * 60 * 60 * 24,
		});

		return { message: 'Login Success' };
	}
}
