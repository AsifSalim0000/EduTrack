import mongoose from 'mongoose';
import BaseContent from './Content';

const quizContentSchema = new mongoose.Schema({
    questions: [{
        question: String,
        options: [String],
        answer: String,
    }],
});

const QuizContent = BaseContent.discriminator('quiz', quizContentSchema);

export default QuizContent;
