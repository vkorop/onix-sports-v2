import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Telegraf } from "telegraf";

@Injectable()
export class NotificationService implements OnModuleInit {
  private logger: Logger = new Logger(NotificationService.name);
  private bot = new Telegraf(process.env.TELEGRAM_API_KEY as string);

  async onModuleInit() {
    this.logger.log('Initialization...');

    await this.bot.launch();

    this.logger.log('Bot has been launched!');
  }
}