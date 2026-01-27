import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { AuthInput, AuthTokenData } from './auth.abstraction'
import { JWT_ACCESS_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN } from './auth.constants'
import { ENV_CONFIG_KEYS } from '@/palform/config/env'
import { UsersService } from '../users/users.service'
import { getErrorMessage } from '@/palform/lib/error'

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly prisma: PrismaService,
		private readonly configService: ConfigService,
		private readonly jwt: JwtService
	) {}

	async register(input: AuthInput) {
		try {
			const email = input.email
			const existingUser = await this.prisma.user.findUnique({
				where: {
					email
				}
			})

			if (existingUser) {
				throw new BadRequestException('User with this email already exists')
			}

			const user = await this.usersService.createUser(input)
			const { accessToken, refreshToken } = this.generateTokens(user)

			return {
				user,
				accessToken,
				refreshToken
			}
		} catch (error) {
			const errorMessage = getErrorMessage(error)
			throw new BadRequestException('Registration failed: ', errorMessage)
		}
	}

	private generateTokens(data: AuthTokenData) {
		const accessToken = this.jwt.sign(data, {
			expiresIn: JWT_ACCESS_EXPIRES_IN,
			secret: this.configService.get<string>(ENV_CONFIG_KEYS.JWT_SECRET)
		})

		const refreshToken = this.jwt.sign(
			{
				id: data.id
			},
			{
				expiresIn: JWT_REFRESH_EXPIRES_IN,
				secret: this.configService.get<string>(ENV_CONFIG_KEYS.JWT_SECRET)
			}
		)

		return {
			accessToken,
			refreshToken
		}
	}
}
