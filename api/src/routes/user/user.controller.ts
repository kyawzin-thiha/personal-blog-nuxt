import {
	Body,
	Controller,
	Get,
	MaxFileSizeValidator,
	ParseFilePipe,
	Put,
	Request,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
	constructor(private readonly user: UserService) {}

	@Get()
	getUser(@Request() req: any) {
		const { id } = req.user;
		return this.user.getUser(id);
	}

	@UseInterceptors(FileInterceptor('file'))
	@Put('/update')
	updateUser(@Request() req: any, @Body() data: any, @UploadedFile(
		new ParseFilePipe({
			validators: [new MaxFileSizeValidator({ maxSize: 1e7 })],
		}),
	)
		file?: Express.Multer.File) {
		const { id } = req.user;
		return this.user.updateUser(id, data, file);
	}

}
