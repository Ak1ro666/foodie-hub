import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'
import { ENV_CONFIG_KEYS } from './env'

export const getJwtConfig = (
	configService: ConfigService
): JwtModuleOptions => ({
	secret: configService.getOrThrow<string>(ENV_CONFIG_KEYS.JWT_SECRET)
})
