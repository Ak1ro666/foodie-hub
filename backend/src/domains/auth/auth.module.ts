import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { PrismaModule } from '../prisma/prisma.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJwtConfig } from '@/palform/config/jwt.config'
import { UsersModule } from '../users/users.module'
import { JwtStrategy } from './strategy/jwt.strategy'
import { PassportModule } from '@nestjs/passport'

@Module({
	imports: [
		PrismaModule,
		PassportModule.register({
			defaultStrategy: 'jwt'
		}),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
		UsersModule
	],
	providers: [JwtStrategy, AuthService, AuthResolver]
})
export class AuthModule { }
