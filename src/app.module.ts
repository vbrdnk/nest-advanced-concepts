import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [CoffeesModule, RecipesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
