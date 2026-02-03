import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard as AuthGuardPassport } from "@nestjs/passport";
import { Request } from "express";

export class AuthGuard extends AuthGuardPassport('jwt') {
	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context)
		return ctx.getContext<{ req: Request }>().req
	}
}