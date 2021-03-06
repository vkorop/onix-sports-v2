import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value && new ObjectId(value.trim());
  }
}