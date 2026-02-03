import type { CookieOptions, Request, Response } from "express";

export type SameSite = CookieOptions['sameSite']
export type GqlContext = {
	req: Request
	res: Response
}