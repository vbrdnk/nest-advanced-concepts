import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { RecipesModule } from './recipes/recipes.module';
import { TagsModule } from './tags/tags.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    CoffeesModule,
    RecipesModule,
    TagsModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
