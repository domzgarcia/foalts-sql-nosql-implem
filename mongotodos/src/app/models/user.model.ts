import { Document, model, Model, models, Schema } from 'mongoose';
import { hashPassword } from '@foal/core';

const userSchema: Schema = new Schema({
    email: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    }
});

export interface IUser extends Document {
    email: string,
    password: string,
}

export const User: Model<IUser> = models.User || model<IUser>('User', userSchema);


/*
|----------------
| Model Methods
|----------------
*/
export const createUser = async (email, password) => {
    const user = new User();
    user.email = email;
    user.password = await hashPassword(password);
    await user.save();
}

export const getUser = async (email) => {
    const user = await User.findOne({email});
    return user;
}
