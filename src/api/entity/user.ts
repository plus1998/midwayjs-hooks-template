import { prop, modelOptions } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: {
        collection: 'User',
        timestamps: true,
    }
})
export class User {
    // 仅为类声明
    _id: string;
    createdAt: Date;
    updatedAt: Date;

    @prop({ type: String, required: true, unique: true })
    public username: string;

    @prop({ type: String, required: true })
    public password: string;

    @prop({ type: () => String, default: 'user' })
    public role: string;
}