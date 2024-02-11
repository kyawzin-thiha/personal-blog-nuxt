import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AWSService } from './aws.service';
import { JwtTokenService } from './jwt.service';
import { BcryptService } from './bcrypt.service';

@Module({
	providers: [PrismaService, AWSService, JwtTokenService, BcryptService],
	exports: [PrismaService, AWSService, JwtTokenService, BcryptService],
})
export class HelperModule {}
