import { Injectable } from '@nestjs/common';
import { PrismaService } from '../helper/prisma.service';
import { UserDto } from '../types/data.dto';
import { ErrorDto } from '../types/error.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
	constructor(private readonly prisma: PrismaService) {}

	async get(identifier: string): Promise<[UserDto, ErrorDto]> {
		try {
			const user = await this.prisma.user.findUnique({
				where: { id: identifier },
			});

			if (!user) {
				return [null, { message: 'User not found.', status: 404 }];
			}

			return [user, null];
		} catch (error) {
			return [null, { message: 'Something went wrong. Please try again later.', status: 500 }];
		}
	}

	async update(identifier: string, data: Partial<User>): Promise<ErrorDto> {
		try {
			await this.prisma.user.update({
				where: { id: identifier },
				data,
			});
			return null;
		} catch (error) {
			return { message: 'Something went wrong. Please try again later.', status: 500 };
		}
	}
}