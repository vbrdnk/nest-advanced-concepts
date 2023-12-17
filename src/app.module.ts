import { Module } from '@nestjs/common';
import { ContextIdFactory } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { RecipesModule } from './recipes/recipes.module';
import { DataSourceModule } from './data-source/data-source.module';
import { UsersModule } from './users/users.module';
import { AggregateByTenantStrategy } from './core/aggregate-by-tenant.strategy';

ContextIdFactory.apply(new AggregateByTenantStrategy());

@Module({
  imports: [CoffeesModule, RecipesModule, DataSourceModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
