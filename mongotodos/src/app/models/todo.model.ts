import { Document, model, Model, models, Schema } from 'mongoose';

const todoSchema: Schema = new Schema({
    text: {
        required: true,
        type: String,
    }
});

export interface ITodo extends Document {
    text: string;
}

export const Todo: Model<ITodo> = models.Todo || model<ITodo>('Todo', todoSchema);
