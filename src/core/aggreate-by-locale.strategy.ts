import {
  ContextId,
  ContextIdFactory,
  ContextIdResolver,
  ContextIdResolverFn,
  ContextIdStrategy,
  HostComponentInfo,
} from '@nestjs/core';
import { Request } from 'express';
import { pick } from 'accept-language-parser';
import { I18nService } from '../i18n/i18n.service';

export class AggregateByLocaleStrategy implements ContextIdStrategy {
  private readonly locales = new Map<string, ContextId>();

  attach(
    contextId: ContextId,
    request: Request,
  ): ContextIdResolverFn | ContextIdResolver | undefined {
    const localeCode =
      pick(
        I18nService.supportedLanguages,
        request.headers['accept-language'],
      ) ?? I18nService.defaultLanguage;

    let localeSubTreeId: ContextId;
    if (this.locales.has(localeCode)) {
      localeSubTreeId = this.locales.get(localeCode);
    } else {
      // Create a new sub-tree for the tenant
      localeSubTreeId = ContextIdFactory.create();
      this.locales.set(localeCode, localeSubTreeId);
      setTimeout(() => this.locales.delete(localeCode), 3000);
    }

    return {
      payload: { localeCode },
      resolve: (info: HostComponentInfo) =>
        info.isTreeDurable ? localeSubTreeId : contextId,
    };
  }
}
