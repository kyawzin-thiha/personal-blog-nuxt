import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HelperModule } from '../../helper/helper.module';
import { DbModule } from '../../db/db.module';

@Module({
	imports: [HelperModule, DbModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
