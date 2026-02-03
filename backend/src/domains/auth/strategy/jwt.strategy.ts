import { UsersService } from "@/domains/users/users.service";
import { ENV_CONFIG_KEYS } from "@/palform/config/env";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "prisma/generated/prisma/client";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		private readonly usersService: UsersService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.getOrThrow<string>(ENV_CONFIG_KEYS.JWT_SECRET),
			ignoreExpiration: false // TODO: В будудщем посмотреть, если будут ошибки
		})
	}

	validate({ id }: { id: string }): Promise<User | null> {
		return this.usersService.findById({ id })
	}
}