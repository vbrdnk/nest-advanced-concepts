import { Module } from '@nestjs/common';
import { ContextIdFactory } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { RecipesModule } from './recipes/recipes.module';
import { DataSourceModule } from './data-source/data-source.module';
import { UsersModule } from './users/users.module';
import { I18nModule } from './i18n/i18n.module';
import { AggregateByLocaleStrategy } from './core/aggreate-by-locale.strategy';

ContextIdFactory.apply(new AggregateByLocaleStrategy());

@Module({
  imports: [
    CoffeesModule,
    RecipesModule,
    DataSourceModule,
    UsersModule,
    I18nModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
