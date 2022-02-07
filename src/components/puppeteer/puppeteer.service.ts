import { Injectable } from "@nestjs/common";
import { InjectPage } from "nest-puppeteer";
import { Page, Viewport } from "puppeteer";
import { ScreenshotRepository } from "./screenshots.repository";

@Injectable()
export class PuppeteerService {
  constructor(
    @InjectPage() private readonly page: Page,

    private readonly screenshotRepository: ScreenshotRepository,
  ) {}

  public async screenshot(html: string, viewport?: Viewport) {
    await this.page.setViewport({ width: 600, height: 550 });
    await this.page.setContent(html);

    const path = this.screenshotRepository.newPath(`new-${Date.now()}.png`);
    
    this.screenshotRepository.savePath(path);
    await this.page.screenshot({ path });

    return path;
  }

  public removeScreenshots() {
    return this.screenshotRepository.clearAll();
  }
}