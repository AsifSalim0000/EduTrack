import asyncHandler from 'express-async-handler';
import { fetchCourses, addCourse } from '../../usecases/courseUsecase.js';

const getCoursesController = asyncHandler(async (req, res) => {
  const { page = 1, search = '' } = req.query;
  try {
    const courses = await fetchCourses(page, search);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

const createCourseController = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const { filename: thumbnail } = req.file; // Multer file handling
  const instructor = req.user.id;
  
  try {
    const course = await addCourse({ title, description, thumbnail, instructor });
   
    
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error creating course" });
  }
});
export {getCoursesController,createCourseController}
