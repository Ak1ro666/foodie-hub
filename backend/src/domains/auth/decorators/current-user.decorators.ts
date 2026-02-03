import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import type { CurrentUserType, CurrentUserTypeKey, RequestWithUser } from "../domain/auth.abstraction";

export const CurrentUser = createParamDecorator((data: CurrentUserTypeKey, ctx: ExecutionContext) => {
	let user: CurrentUserType = null;

	if (ctx.getType() === 'http') {
		user = ctx.switchToHttp().getRequest<RequestWithUser>().user
	} else {
		const context = GqlExecutionContext.create(ctx);
		user = context.getContext<{ req: RequestWithUser }>().req.user
	}

	if (!user) {
		return null
	}


	return data ? user[data] : user
})


// @CurrentUser() user: UserModel
// @CurrentUser('id') userId: string