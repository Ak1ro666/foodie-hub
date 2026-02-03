import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "prisma/generated/prisma/enums";
import { AuthGuard } from "../guards/auth.guard";
import { AdmingGuard } from "../guards/admin.guard";

export const Auth = (role: Role = Role.USER) => {
	if (role === Role.ADMIN) {
		return applyDecorators(UseGuards(AuthGuard, AdmingGuard))
	}

	return applyDecorators(UseGuards(AuthGuard))
}

// @Auth()
// @Auth(_, ...)
// @Auth(Role.ADMIN)
// @Auth(Role.ADMIN, ...)