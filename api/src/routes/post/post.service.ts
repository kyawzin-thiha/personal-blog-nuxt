import { HttpException, Injectable } from '@nestjs/common';
import { PostRepository } from '../../db/post.repository';
import { AWSService } from '../../helper/aws.service';

@Injectable()
export class PostService {
	constructor(private readonly post: PostRepository, private readonly aws: AWSService) {}

	async getAllPosts() {
		const [posts, dbError] = await this.post.getAll();
		if (dbError) throw new HttpException(dbError.message, dbError.status);

		return posts;
	}

	async getPost(id: string) {
		const [post, dbError] = await this.post.find(id);
		if (dbError) throw new HttpException(dbError.message, dbError.status);

		return post;
	}

	async createPost(id: string, title: string, slug: string, subtitle: string, content: string, file: Express.Multer.File) {
		const fileName = file.originalname.replace(/\s+/g, '_');
		const [url, awsError] = await this.aws.uploadFile(fileName, file);
		if (awsError) throw new HttpException(awsError.message, awsError.status);

		const [newPost, dbError] = await this.post.create(id, title, slug, subtitle, url, content);
		if (dbError) throw new HttpException(dbError.message, dbError.status);

		return newPost;
	}

	async updatePost(id: string, data: any, file: Express.Multer.File) {
		let thumbnail: null | string = null;
		if (file) {
			const fileName = file.originalname.replace(/\s+/g, '_');
			const [url, awsError] = await this.aws.uploadFile(fileName, file);
			if (awsError) throw new HttpException(awsError.message, awsError.status);
			thumbnail = url;
		}

		if (thumbnail) {
			data.thumbnail = thumbnail;
		}

		const dbError = await this.post.update(id, data);
		if (dbError) throw new HttpException(dbError.message, dbError.status);

		return null;
	}

	async deletePost(id: string) {
		const dbError = await this.post.delete(id);
		if (dbError) throw new HttpException(dbError.message, dbError.status);

		return null;
	}
}
