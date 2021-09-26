import { NotificationConfig } from "./notification-config.interface";

export interface NotificationModuleAsyncConfig {
  imports?: any[];
  useFactory: (
      ...args: any[]
    ) => Promise<NotificationConfig> | NotificationConfig;
  inject?: any[];
}