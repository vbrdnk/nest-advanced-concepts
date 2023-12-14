import { ConfigurableModuleBuilder } from '@nestjs/common';

type HttpClientModuleExtras = {
  isGlobal?: boolean;
};
export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: HTTP_MODULE_OPTIONS,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<{
  baseUrl?: string;
}>({ alwaysTransient: true })
  .setExtras<HttpClientModuleExtras>(
    {
      isGlobal: true,
    },
    (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }),
  )
  .build();
