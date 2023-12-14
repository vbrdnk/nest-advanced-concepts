import { OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { Worker } from 'worker_threads';
import { filter, firstValueFrom, fromEvent, map, Observable } from 'rxjs';
import { join } from 'path';
import { randomUUID } from 'crypto';

export class FibonacciWorkerHost
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private worker: Worker;
  private message$: Observable<{ id: string; result: number }>;

  onApplicationBootstrap(): any {
    this.worker = new Worker(join(__dirname, 'fibonacci.worker.js'));
    this.message$ = fromEvent(this.worker, 'message') as unknown as Observable<{
      id: string;
      result: number;
    }>;
  }

  async onApplicationShutdown(signal?: string): Promise<void> {
    this.worker.terminate();
  }

  run(n: number) {
    const id = randomUUID();
    this.worker.postMessage({ n, id });
    return firstValueFrom(
      this.message$.pipe(
        filter((message) => message.id === id),
        map(({ result }) => result),
      ),
    );
  }
}
