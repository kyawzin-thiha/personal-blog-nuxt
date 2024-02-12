import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { HelperModule } from './helper/helper.module';
import { DbModule } from './db/db.module';
import { AuthModule } from './routes/auth/auth.module';
import { AuthGuard } from './guard/auth.guard';
import { PostModule } from './routes/post/post.module';
import { UserModule } from './routes/user/user.module';

@Module({
	imports: [ConfigModule.forRoot({
		isGlobal: true,
	}), HelperModule, DbModule, AuthModule, PostModule, UserModule],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule {}
