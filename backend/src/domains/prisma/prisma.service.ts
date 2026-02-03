import {
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from 'prisma/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { ENV_CONFIG_KEYS } from '@/palform/config/env'

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy {
	private readonly logger = new Logger(PrismaService.name)
	private readonly pool: Pool

	constructor(configService: ConfigService) {
		const connectionString = configService.getOrThrow<string>(
			ENV_CONFIG_KEYS.DATABASE_URL
		)

		const pool = new Pool({ connectionString })
		const adapter = new PrismaPg(pool)

		super({ adapter })
		this.pool = pool
	}

	async onModuleInit() {
		try {
			await this.$connect()
			this.logger.log('✅ Prisma connected to PostgreSQL (via PG Adapter)')
		} catch (error) {
			this.logger.error('❌ Failed to connect to PostgreSQL:', error)
		}
	}

	async onModuleDestroy() {
		try {
			await this.$disconnect()
			await this.pool.end()
			this.logger.log('✅ Prisma disconnected from PostgreSQL')
		} catch (error) {
			this.logger.error('❌ Failed to disconnect from PostgreSQL:', error)
		}
	}
}
