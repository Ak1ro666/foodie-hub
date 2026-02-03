export type Simplify<T> = {
	[K in keyof T]: T[K]
} & {}

export type OmitNullAndUndefinedWithUnion<T> =
	T extends null | undefined
	? never
	: T
