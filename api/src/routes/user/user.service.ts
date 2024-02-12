import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../db/user.repository';
import { AWSService } from '../../helper/aws.service';

@Injectable()
export class UserService {
	constructor(private readonly user: UserRepository, private readonly aws: AWSService) {}

	async getUser(id: string) {
		const [user, dbError] = await this.user.get(id);
		if (dbError) throw new HttpException(dbError.message, dbError.status);
		return user;
	}

	async updateUser(id: string, data: any, file: Express.Multer.File) {
		let avatar: null | string = null;
		if (file) {
			const fileName = file.originalname.replace(/\s+/g, '_');
			const [url, awsError] = await this.aws.uploadFile(fileName, file);
			if (awsError) throw new HttpException(awsError.message, awsError.status);
			avatar = url;
		}

		if (avatar) {
			data.avatar = avatar;
		}

		const dbError = await this.user.update(id, data);

		if (dbError) throw new HttpException(dbError.message, dbError.status);

		return true;
	}
}
