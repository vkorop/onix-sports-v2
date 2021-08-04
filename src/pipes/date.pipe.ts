import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return new Date(Number(value));
  }
}