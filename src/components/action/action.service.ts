import { Injectable } from "@nestjs/common";
import { ActionRepository } from "./action.repository";
import { CreateActionDto } from "./dto/create-action.dto";

@Injectable()
export class ActionService {
  constructor(
    private readonly actionRepository: ActionRepository,
  ) {}

  public create(actions: CreateActionDto[]) {
    return this.actionRepository.create(actions);
  }
}