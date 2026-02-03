import { ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigService } from '@nestjs/config'
import { Request, Response } from 'express'

interface GraphQLContext {
	req: Request
	res: Response
}

export const getGraphQLConfig = (
	configService: ConfigService
): ApolloDriverConfig => ({
	autoSchemaFile: true,
	sortSchema: true,
	playground: configService.getOrThrow<string>('MODE') === 'development',
	debug: configService.getOrThrow<string>('MODE') === 'development',
	context: ({ req, res }: GraphQLContext) => ({ req, res }) // Для авторизации, чтобы в потенциале пробрасывались токены для авторизации
})
