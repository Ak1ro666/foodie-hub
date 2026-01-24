import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from '../domains/auth/auth.module'
import { UsersModule } from '../domains/users/users.module'
import { RecipesModule } from '../domains/recipes/recipes.module'
import { OrdersModule } from '../domains/orders/orders.module'
import { PrismaModule } from '../domains/prisma/prisma.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { getGraphQLConfig } from '../palform/config/graphql.config'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		GraphQLModule.forRootAsync<ApolloDriverConfig>({
			driver: ApolloDriver,
			imports: [ConfigModule],
			useFactory: getGraphQLConfig,
			inject: [ConfigService]
		}),
		PrismaModule,
		AuthModule,
		UsersModule,
		RecipesModule,
		OrdersModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
