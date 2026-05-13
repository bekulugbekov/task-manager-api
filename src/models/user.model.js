<<<<<<< HEAD
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
}, { timestamps: true });

=======
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
}, { timestamps: true });

>>>>>>> master
export default model('User', userSchema);