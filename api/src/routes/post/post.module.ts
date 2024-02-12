import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { HelperModule } from '../../helper/helper.module';
import { DbModule } from '../../db/db.module';

@Module({
	imports: [HelperModule, DbModule],
	controllers: [PostController],
	providers: [PostService],
})
export class PostModule {}
