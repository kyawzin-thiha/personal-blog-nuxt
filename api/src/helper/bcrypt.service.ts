import { Injectable } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class BcryptService {
	hash(value: string) {
		const salt = genSaltSync(11);
		return hashSync(value, salt);
	}

	compare(value: string, hash: string) {
		return compareSync(value, hash);
	}
}