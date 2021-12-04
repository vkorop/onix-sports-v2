import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { seasonsConstants } from "../seasons-constants";

@Schema({
    versionKey: false,
    timestamps: true,
    collection: seasonsConstants.models.seasons,
})
export class Season {
    @Prop({ default: new Date })
    start: Date;

    @Prop()
    end: Date;

    @Prop()
    order: Number;

    @Prop({ default: false })
    closed: Boolean;

    @Prop({ default: [] })
    notices: String[];
}

export type SeasonEntity = Season & Document;

export const SeasonSchema = SchemaFactory.createForClass(Season);

SeasonSchema.pre('save', async function (next) {
    const order = await this.collection.countDocuments() + 1;

    Reflect.set(this, 'order', order);
  
    next();
});