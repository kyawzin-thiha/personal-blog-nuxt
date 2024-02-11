import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { HelperModule } from './helper/helper.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './routes/auth/auth.module';
import { AuthGuard } from './guard/auth.guard';

@Module({
	imports: [ConfigModule.forRoot({
		isGlobal: true,
	}), HelperModule, DbModule, AuthModule],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule {}
