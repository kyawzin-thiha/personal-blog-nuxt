import { Module } from '@nestjs/common';
import { HelperModule } from '../helper/helper.module';
import { AccountRepository } from './account.repository';
import { UserRepository } from './user.repository';
import { PostRepository } from './post.repository';

@Module({
	imports: [HelperModule],
	providers: [AccountRepository, UserRepository, PostRepository],
	exports: [AccountRepository, UserRepository, PostRepository],
})
export class DbModule {}
