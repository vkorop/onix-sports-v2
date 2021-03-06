import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseNumberPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value && Number(value);
  }
}