import { Injectable } from '@nestjs/common';
import { PrismaService } from '../helper/prisma.service';
import { AccountDetailDto } from '../types/data.dto';
import { ErrorDto } from '../types/error.dto';

@Injectable()
export class AccountRepository {
	constructor(private readonly prisma: PrismaService) {}

	async find(identifier: string): Promise<[AccountDetailDto, ErrorDto]> {
		try {
			const account = await this.prisma.account.findFirst({
				where: { OR: [{ username: identifier }, { email: identifier }] },
				include: { user: true },
			});
			if (!account) {
				return [null, { message: 'Account not found.', status: 404 }];
			}
			return [account, null];
		} catch (error) {
			return [null, { message: 'Something went wrong. Please try again later.', status: 500 }];
		}
	}

	async get(identifier: string): Promise<[AccountDetailDto, ErrorDto]> {
		try {
			const account = await this.prisma.account.findUnique({
				where: { id: identifier },
				include: { user: true },
			});
			if (!account) {
				return [null, { message: 'Account not found.', status: 404 }];
			}
			return [account, null];
		} catch (error) {
			return [null, { message: 'Something went wrong. Please try again later.', status: 500 }];
		}
	}
}
