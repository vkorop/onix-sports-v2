import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ChatType } from "../enums/chat-type.enum";

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Chat {
  @Prop({ required: true })
  type: ChatType;

  @Prop({ required: true, unique: true })
  chatId: Number;

  @Prop({ default: false })
  subscribed: Boolean;
}

export type ChatDocument = Chat & Document;

export const ChatSchema = SchemaFactory.createForClass(Chat);