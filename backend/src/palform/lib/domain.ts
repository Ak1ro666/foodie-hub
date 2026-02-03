import { ConfigService } from "@nestjs/config";
import { ENV_CONFIG_KEYS } from "../config/env";

export function isDev(configService: ConfigService): boolean {
	return configService.getOrThrow<string>(ENV_CONFIG_KEYS.MODE) === 'development'
}