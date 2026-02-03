import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/domains/prisma/prisma.service'
import { CreateUserInput, FindByEmailInput, FindByIdInput } from './domain/user.abstraction'
import { hash } from 'argon2'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) { }

	async createUser(input: CreateUserInput) {
		return await this.prisma.user.create({
			data: {
				email: input.email,
				password: await hash(input.password)
			}
		})
	}

	async getAll() {
		return await this.prisma.user.findMany()
	}

	async findById(input: FindByIdInput) {
		return await this.prisma.user.findUnique({
			where: {
				id: input.id
			},
			include: {
				profile: true,
				bodyMeasurement: true
			}
		})
	}

	async findByEmail(input: FindByEmailInput) {
		return await this.prisma.user.findUnique({
			where: {
				email: input.email
			},
		})
	}
}
