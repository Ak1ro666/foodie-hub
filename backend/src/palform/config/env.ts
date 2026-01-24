export const ENV_CONFIG_KEYS = {
	DATABASE_URL: 'DATABASE_URL',
	MODE: 'MODE'
} as const

type EnvConfigKeys = keyof typeof ENV_CONFIG_KEYS
export type Env = (typeof ENV_CONFIG_KEYS)[EnvConfigKeys]
