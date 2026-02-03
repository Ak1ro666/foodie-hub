import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { ActivityLevel, Gender, NutritionGoal, Role } from "prisma/generated/prisma/enums";

registerEnumType(Role, { name: 'Role' })
registerEnumType(Gender, { name: 'Gender' })
registerEnumType(ActivityLevel, { name: 'ActivityLevel' })
registerEnumType(NutritionGoal, { name: 'NutritionGoal' })

@ObjectType()
export class bodyMeasurement {
	@Field()
	id: string

	@Field(() => Int, { nullable: true })
	heightCm?: number

	@Field(() => Int, { nullable: true })
	weightKg?: number

	@Field(() => Int, { nullable: true })
	goalWeightKg?: number

	@Field(() => Int, { nullable: true })
	chestCm?: number

	@Field(() => Int, { nullable: true })
	waistCm?: number

	@Field(() => Int, { nullable: true })
	thighCm?: number

	@Field(() => Int, { nullable: true })
	armCm?: number

	@Field(() => ActivityLevel, { nullable: true })
	activiteLevel?: ActivityLevel

	@Field(() => NutritionGoal, { nullable: true })
	nutritionGoal?: NutritionGoal

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date
}

@ObjectType()
export class ProfileModel {
	@Field()
	id: string

	@Field()
	fullName: string

	@Field(() => Gender, { nullable: true })
	gender?: Gender

	@Field(() => Int, { nullable: true })
	age?: number

	@Field(() => String, { nullable: true })
	bio?: string

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date
}

@ObjectType()
export class UserProfileModel {
	@Field()
	id: string

	@Field()
	email: string

	@Field(() => Role)
	role: Role

	@Field(() => ProfileModel, { nullable: true })
	profile?: ProfileModel

	@Field(() => bodyMeasurement, { nullable: true })
	bodyMeasurement?: bodyMeasurement

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date
}