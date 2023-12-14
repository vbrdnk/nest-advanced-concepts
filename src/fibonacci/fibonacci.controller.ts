import { Controller, Get, Query } from '@nestjs/common';
import Piscina from 'piscina';
import { resolve } from 'path';

@Controller('fibonacci')
export class FibonacciController {
  private fibonacciWorker = new Piscina({
    filename: resolve(__dirname, 'fibonacci.worker.js'),
  });

  @Get()
  fibonacci(@Query('n') n = 10): Promise<number> {
    return this.fibonacciWorker.run(n);
  }
}
