import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AWSService } from './aws.service';
import { JwtTokenService } from './jwt.service';
import { BcryptService } from './bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [JwtModule.registerAsync({
		imports: [ConfigModule],
		useFactory: async (configService: ConfigService) => ({
			global: true,
			secret: configService.get('JWT_SECRET'),
			signOptions: { expiresIn: '1d' },
		}),
		inject: [ConfigService],
	})],
	providers: [PrismaService, AWSService, JwtTokenService, BcryptService],
	exports: [PrismaService, AWSService, JwtTokenService, BcryptService],
})
export class HelperModule {}
