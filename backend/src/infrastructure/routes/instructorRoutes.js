
import express from 'express';
import { handleCreateInstructor } from '../../controllers/instructor/InstructorController.js';
import { protect } from '../../middlewares/authMiddleware.js'
import { createCourseController, getCoursesController } from '../../controllers/instructor/CourseController.js';
import upload from '../../middlewares/upload.js';

const router = express.Router();

router.post('/create-instructor',protect,  handleCreateInstructor);
router.get('/courses', getCoursesController);
router.post('/create-course', protect, upload.single('thumbnail'), createCourseController);

export default router;
