import { Account, Post, User } from '@prisma/client';

export type AccountDto = Account | null;
export type AccountDetailDto = Account & { user: User } | null;

export type UserDto = User | null;

export type PostDto = Post & { author: User } | null;
export type PostsDto = (Post & { author: User })[] | null;