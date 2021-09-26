import { Provider } from "@nestjs/common";
import { NotificationModuleAsyncConfig } from "./interfaces/notification-module-config.interface";
import { getModuleOptionsToken } from "./notification.utils";

export const forRootAsyncProviders = (options: NotificationModuleAsyncConfig): Provider[] => ([
  {
    provide: getModuleOptionsToken(),
    useFactory: options.useFactory,
    inject: options.inject || [],
  },
])