import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import type * as Schema from '../assets/locales/en.json';
import * as en from '../assets/locales/en.json';
import * as pl from '../assets/locales/pl.json';
import format from 'string-format';

@Injectable({ scope: Scope.REQUEST, durable: true })
export class I18nService {
  public static readonly defaultLanguage = 'en';
  public static readonly supportedLanguages = ['en', 'pl'];
  private readonly locales: Record<string, typeof Schema> = { en, pl };

  constructor(
    @Inject(REQUEST) private readonly payload: { localeCode: string },
  ) {}

  translate(
    key: keyof typeof Schema,
    ...args: Array<string | Record<string, unknown>>
  ): string {
    const locale =
      this.locales[this.payload.localeCode ?? I18nService.defaultLanguage];
    const text = locale[key];
    return format(text, ...args);
  }
}
