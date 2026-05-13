<<<<<<< HEAD
import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { 
        type: String, 
        enum: ['todo', 'doing', 'done'], 
        default: 'todo' 
    },
    deadline: { type: Date },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    picture: { type: String } // Vazifa uchun rasm (fileService orqali)
}, { timestamps: true });

=======
import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { 
        type: String, 
        enum: ['todo', 'doing', 'done'], 
        default: 'todo' 
    },
    deadline: { type: Date },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    picture: { type: String } // Vazifa uchun rasm (fileService orqali)
}, { timestamps: true });

>>>>>>> master
export default model('Task', taskSchema);