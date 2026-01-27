import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { PrismaModule } from '../prisma/prisma.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJwtConfig } from '@/palform/config/jwt.config'
import { UsersModule } from '../users/users.module'

@Module({
	imports: [
		PrismaModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
		UsersModule
	],
	providers: [AuthService, AuthResolver]
})
export class AuthModule {}
