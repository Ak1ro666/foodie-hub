import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { AuthInput, AuthResponse } from './auth.abstraction'

@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	// TODO: Captcha
	@Mutation(() => AuthResponse)
	async register(@Args('data') input: AuthInput) {
		// TODO: Add work with cookie
		return await this.authService.register(input)
	}
}
