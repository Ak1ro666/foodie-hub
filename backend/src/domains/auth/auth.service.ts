import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { AuthInput, AuthTokenData } from './domain/auth.abstraction'
import { JWT_ACCESS_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN, REFRESH_TOKEN_NAME, EXPIRES_DAY_REFRESH_TOKEN } from './auth.constants'
import { UsersService } from '../users/users.service'
import { getErrorMessage } from '@/palform/lib/error'
import { verify } from 'argon2'
import { Response } from 'express'
import { ConfigService } from '@nestjs/config'
import { ENV_CONFIG_KEYS } from '@/palform/config/env'
import { SameSite } from '@/palform/types/request'
import { isDev } from '@/palform/lib/domain'

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly prisma: PrismaService,
		private readonly jwt: JwtService,
		private readonly configService: ConfigService

	) { }

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

	async login(input: AuthInput) {
		const user = await this.validateUser(input)
		const { accessToken, refreshToken } = this.generateTokens(user)

		return {
			user,
			accessToken,
			refreshToken
		}
	}

	private async validateUser(input: AuthInput) {
		const user = await this.usersService.findByEmail(input)

		if (!user) {
			throw new NotFoundException("Invalid email or password")
		}

		const isValidPassword = await verify(user.password, input.password)

		if (!isValidPassword) {
			throw new NotFoundException("Invalid email or password")
		}

		return user
	}

	private generateTokens(data: AuthTokenData) {
		const accessToken = this.jwt.sign(data, {
			expiresIn: JWT_ACCESS_EXPIRES_IN,
		})

		const refreshToken = this.jwt.sign(
			{
				id: data.id
			},
			{
				expiresIn: JWT_REFRESH_EXPIRES_IN,
			}
		)

		return {
			accessToken,
			refreshToken
		}
	}

	removeRefreshToken(response: Response) {
		response.clearCookie(REFRESH_TOKEN_NAME)
	}

	updateRefreshToken(response: Response, token: string) {
		const domain = this.configService.getOrThrow<string>(ENV_CONFIG_KEYS.DOMAIN)

		const expiresIn = new Date(Date.now() + EXPIRES_DAY_REFRESH_TOKEN * 24 * 60 * 60 * 1000)
		const sameSite: SameSite = isDev(this.configService) ? 'none' : 'strict' // lax если много поддоменов

		response.cookie(REFRESH_TOKEN_NAME, token, {
			httpOnly: true,
			domain,
			expires: expiresIn,
			sameSite,
			secure: true
		})
	}
}
