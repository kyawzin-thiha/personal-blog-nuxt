import {
	Body,
	Controller,
	Delete,
	Get,
	MaxFileSizeValidator,
	Param,
	ParseFilePipe,
	Post,
	Request,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('post')
export class PostController {
	constructor(private readonly post: PostService) {}

	@Get('/get-all')
	getAllPost() {
		return this.post.getAllPosts();
	}

	@Get('/:id')
	getPost(@Param('id') id: string) {
		return this.post.getPost(id);
	}

	@UseInterceptors(FileInterceptor('file'))
	@Post('/create')
	async createPost(@Body() data: {
		title: string,
		slug: string,
		subtitle: string,
		content: string
	}, @Request() req: any, @UploadedFile(
		new ParseFilePipe({
			validators: [new MaxFileSizeValidator({ maxSize: 1e7 })],
		}),
	)
		file: Express.Multer.File) {
		const { id } = req.user;
		return this.post.createPost(id, data.title, data.slug, data.subtitle, data.content, file);
	}

	@UseInterceptors(FileInterceptor('file'))
	@Post('/update/:id')
	async updatePost(@Param('id') id: string, @Body() data: any, @UploadedFile(
		new ParseFilePipe({
			validators: [new MaxFileSizeValidator({ maxSize: 1e7 })],
		}),
	)
		file?: Express.Multer.File) {
		return this.post.updatePost(id, data, file);
	}

	@Delete('/delete/:id')
	async deletePost(@Param('id') id: string) {
		return this.post.deletePost(id);
	}
}
