import mongoose from 'mongoose';
import BaseContent from './Content';

const videoContentSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
});

const VideoContent = BaseContent.discriminator('video', videoContentSchema);

export default VideoContent;
