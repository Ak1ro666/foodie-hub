import { Role } from 'prisma/generated/prisma/enums'
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { OmitNullAndUndefinedWithUnion, Simplify } from '@/palform/types/utils'

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

export type CurrentUserType = Simplify<UserModel> | null
export type CurrentUserTypeKey = Simplify<keyof OmitNullAndUndefinedWithUnion<CurrentUserType>>
export type AuthTokenData = {
	id: string
	role: Role
}

export type RequestWithUser = {
	user: CurrentUserType
}