import mongoose from 'mongoose';
import BaseContent from './Content';

const textContentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
});

const TextContent = BaseContent.discriminator('text', textContentSchema);

export default TextContent;
