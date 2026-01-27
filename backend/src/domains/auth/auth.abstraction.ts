import { Role } from 'prisma/generated/prisma/enums'
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'

@InputType()
export class AuthInput {
	@Field()
	email: string

	@Field()
	password: string
}

registerEnumType(Role, {
	name: 'Role'
})

@ObjectType()
export class UserModel {
	@Field()
	id: string

	@Field()
	email: string

	@Field(() => Role)
	role: Role
}

// TODO: Codegen generate models for graphql
@ObjectType()
export class AuthResponse {
	@Field(() => UserModel)
	user: UserModel

	@Field()
	accessToken: string
}

export type AuthTokenData = {
	id: string
	role: Role
}
