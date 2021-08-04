import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ObjectIdsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value.split(',').map((id: string) => new ObjectId(id.trim()));
  }
}