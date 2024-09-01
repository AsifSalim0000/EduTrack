
import express from 'express';
import { handleCreateInstructor } from '../../controllers/InstructorController.js';
import { protect } from '../../middlewares/authMiddleware.js'

const router = express.Router();

router.post('/create-instructor',protect,  handleCreateInstructor);


export default router;
