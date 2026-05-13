<<<<<<< HEAD
import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

=======
import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

>>>>>>> master
export default model('Project', projectSchema);