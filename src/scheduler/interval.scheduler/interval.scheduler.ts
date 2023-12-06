import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { INTERVAL_HOST_KEY } from '../decorators/interval-host.decorator';
import { INTERVAL_KEY } from '../decorators/interval.decorator';

@Injectable()
export class IntervalScheduler
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private intervals: NodeJS.Timeout[] = [];

  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  onApplicationBootstrap(): any {
    const providers = this.discoveryService.getProviders();
    providers.forEach((wrapper) => {
      const { instance } = wrapper;
      const prototype = instance && Object.getPrototypeOf(instance);
      if (!instance || !prototype) {
        return;
      }

      const isIntervalHost =
        this.reflector.get(INTERVAL_HOST_KEY, instance.constructor) ?? false;

      if (!isIntervalHost) {
        return;
      }

      const methodKeys = this.metadataScanner.getAllMethodNames(prototype);

      console.log(methodKeys, 'methodKeys ');

      methodKeys.forEach((methodKey) => {
        const interval = this.reflector.get(INTERVAL_KEY, instance[methodKey]);

        if (!interval) {
          return;
        }

        const intervalRef = setInterval(() => instance[methodKey](), interval);
        this.intervals.push(intervalRef);
      });
      console.log(wrapper.token);
    });
  }

  onApplicationShutdown(signal?: string): any {
    for (const intervalRef of this.intervals) {
      console.log(`clearing interval ${intervalRef}`);
      clearInterval(intervalRef);
    }
  }
}
