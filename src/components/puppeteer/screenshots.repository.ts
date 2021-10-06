import { Injectable } from "@nestjs/common";
import fs from 'fs';

@Injectable()
export class ScreenshotRepository {
  private src =  'src/components/puppeteer/screenshots/';
  private storage: {[key: string]: boolean} = {};

  public newPath(name: string) {
    return `${this.src}${name}`;
  }

  public savePath(path: string) {
    return this.storage[path] = true;
  }

  public clearAll() {
    for (const path of Object.keys(this.storage)) {
      fs.unlinkSync(path);

      delete this.storage[path];
    }

    return null;
  }
}