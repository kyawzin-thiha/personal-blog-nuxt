import { Injectable } from '@nestjs/common';
import { PrismaService } from '../helper/prisma.service';
import { PostDto, PostsDto } from '../types/data.dto';
import { ErrorDto } from '../types/error.dto';
import { Post, Prisma } from '@prisma/client';

@Injectable()
export class PostRepository {
	constructor(private readonly prisma: PrismaService) {}

	async find(identifier: string): Promise<[PostDto, ErrorDto]> {
		try {
			const post = await this.prisma.post.findFirst({
				where: { OR: [{ slug: identifier }, { id: identifier }] },
				include: { author: true },
			});
			if (!post) {
				return [null, { message: 'Post not found.', status: 404 }];
			}
			return [post, null];
		} catch (error) {
			return [null, { message: 'Something went wrong. Please try again later.', status: 500 }];
		}
	}

	async get(identifier: string): Promise<[PostDto, ErrorDto]> {
		try {
			const post = await this.prisma.post.findUnique({
				where: { id: identifier },
				include: { author: true },
			});
			if (!post) {
				return [null, { message: 'Post not found.', status: 404 }];
			}
			return [post, null];
		} catch (error) {
			return [null, { message: 'Something went wrong. Please try again later.', status: 500 }];
		}
	}

	async getAll(): Promise<[PostsDto, ErrorDto]> {
		try {
			const posts = await this.prisma.post.findMany({
				orderBy: { createdAt: 'desc' },
				include: { author: true },
			});
			return [posts, null];
		} catch (error) {
			return [null, { message: 'Something went wrong. Please try again later.', status: 500 }];
		}
	}

	async create(id: string, title: string, slug: string, subtitle: string, thumbnail: string, content: string): Promise<[PostDto, ErrorDto]> {
		try {
			const post = await this.prisma.post.create({
				data: {
					title,
					slug,
					subtitle,
					thumbnail,
					content,
					author: {
						connect: {
							id,
						},
					},
				},
				include: {
					author: true,
				},
			});

			return [post, null];
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
				return [null, { message: 'Post with this slug already exists.', status: 400 }];
			}
			return [null, { message: 'Something went wrong. Please try again later.', status: 500 }];
		}
	}

	async update(identifier: string, data: Partial<Post>): Promise<ErrorDto> {
		try {
			await this.prisma.post.update({
				where: { id: identifier },
				data,
			});
			return null;
		} catch (error) {
			return { message: 'Something went wrong. Please try again later.', status: 500 };
		}
	}

	async delete(identifier: string): Promise<ErrorDto> {
		try {
			await this.prisma.post.delete({
				where: { id: identifier },
			});
			return null;
		} catch (error) {
			return { message: 'Something went wrong. Please try again later.', status: 500 };
		}
	}
}