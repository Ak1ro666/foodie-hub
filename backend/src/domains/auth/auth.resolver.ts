import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { AuthInput, AuthResponse } from './domain/auth.abstraction'
import type { GqlContext } from '@/palform/types/request'

@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) { }

	// TODO: Captcha
	@Mutation(() => AuthResponse)
	async login(@Args('data') input: AuthInput, @Context() { res }: GqlContext) {
		const { user, accessToken, refreshToken } = await this.authService.login(input)

		if (!refreshToken) {
			this.authService.removeRefreshToken(res)
		} else {
			this.authService.updateRefreshToken(res, refreshToken)
		}

		return {
			user,
			accessToken
		}
	}

	// TODO: Captcha
	@Mutation(() => AuthResponse)
	async register(@Args('data') input: AuthInput, @Context() { res }: GqlContext) {
		const { user, accessToken, refreshToken } = await this.authService.register(input)

		if (!refreshToken) {
			this.authService.removeRefreshToken(res)
		} else {
			this.authService.updateRefreshToken(res, refreshToken)
		}

		return {
			user,
			accessToken
		}
	}
}
