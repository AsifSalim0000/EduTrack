import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    contents: [
        {
            contentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'BaseContent',
                required: true,
            },
            order: {
                type: Number,
                required: true,
            },
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Course', courseSchema);
