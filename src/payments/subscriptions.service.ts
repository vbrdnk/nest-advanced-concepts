import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ModuleRef } from '@nestjs/core';
import { PaymentFailedEvent } from './events/payment-failed.event';
import { EventContext } from './context/event-context';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly moduleRef: ModuleRef) {}

  @OnEvent(PaymentFailedEvent.key)
  async cancelSubscription(event: PaymentFailedEvent) {
    const eventContext = await this.moduleRef.resolve(
      EventContext,
      event.meta.contextId,
    );
    console.log('Canceling subscription...', eventContext.request.url);
  }
}
