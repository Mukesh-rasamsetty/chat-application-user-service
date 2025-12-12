import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  contacts: string[];
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
