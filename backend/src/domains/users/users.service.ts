import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/domains/prisma/prisma.service'
import { CreateUserInput } from './user.abstraction'
import { hash } from 'argon2'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(input: CreateUserInput) {
		return await this.prisma.user.create({
			data: {
				email: input.email,
				password: await hash(input.password)
			}
		})
	}
}
