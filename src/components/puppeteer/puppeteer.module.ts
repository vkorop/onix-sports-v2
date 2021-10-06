import { Module } from "@nestjs/common";
import { PuppeteerModule as MainPuppeteerModule } from 'nest-puppeteer';
import { PuppeteerService } from "./puppeteer.service";
import { ScreenshotRepository } from "./screenshots.repository";

@Module({
  imports: [MainPuppeteerModule.forFeature()],
  providers: [PuppeteerService, ScreenshotRepository],
  exports: [PuppeteerService],
})
export class PuppeteerModule {} 