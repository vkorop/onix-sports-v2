import { DynamicModule, Module, Provider } from "@nestjs/common";
import { NotificationModuleAsyncConfig } from "./interfaces/notification-module-config.interface";
import { forRootAsyncProviders } from "./notification.providers";
import { NotificationService } from "./notification.service";
import { getModuleOptionsToken } from "./notification.utils";

@Module({
  providers: [NotificationService]
})
export class NotificationModule {}