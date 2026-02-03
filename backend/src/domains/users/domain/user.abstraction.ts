import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
	@Field()
	email: string

	@Field()
	password: string
}

@InputType()
export class GetProfileInput {
	@Field()
	id: string
}

@InputType()
export class FindByIdInput {
	@Field()
	id: string
}

@InputType()
export class FindByEmailInput {
	@Field()
	email: string
} 
