import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import type { RequestWithUser } from "../domain/auth.abstraction";
import { Role } from "prisma/generated/prisma/enums";
import { ForbiddenError } from "@nestjs/apollo";

export class AdmingGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector
	) { }

	canActivate(context: ExecutionContext): boolean {
		const ctx = GqlExecutionContext.create(context)
		const user = ctx.getContext<{ req: RequestWithUser }>().req.user

		if (user?.role !== Role.ADMIN) {
			throw new ForbiddenError('You dont\'t have permission to access this resource')
		}

		return true
	}
}