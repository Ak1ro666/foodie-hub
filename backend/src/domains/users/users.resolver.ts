import { Query, Resolver } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { UserProfileModel } from './domain/user-profile.model'
import { CurrentUser } from '../auth/decorators/current-user.decorators'
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from 'prisma/generated/prisma/enums';

@Resolver()
export class UsersResolver {
	constructor(private readonly usersService: UsersService) { }

	@Query(() => UserProfileModel, { name: "profile" })
	@Auth()
	getProfile(@CurrentUser('id') id: string) {
		return this.usersService.findById({ id });
	}

	@Query(() => [UserProfileModel], { name: "users" })
	@Auth(Role.ADMIN)
	async getUsers() {
		return this.usersService.getAll()
	}
}
