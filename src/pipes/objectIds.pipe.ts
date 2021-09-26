import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ObjectIdsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) return null;

    return typeof value === 'string' ? [new ObjectId(value.trim())] : value.map((id: string) => new ObjectId(id.trim()));
  }
}