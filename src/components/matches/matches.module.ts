import { Module } from '@nestjs/common';
import { MatchesGateway } from './matches.gateway';

@Module({
  providers: [MatchesGateway]
})
export class MatchesModule {}
