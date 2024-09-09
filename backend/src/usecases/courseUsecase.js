import { getCourses, createCourse } from '../repositories/InstructorCourseRepository.js';

const fetchCourses = async (page, search) => {
  try {
    return await getCourses(page, search);
  } catch (error) {
    throw new Error('Failed to fetch courses');
  }
};

const addCourse = async (courseData) => {
  try {
    console.log("as",courseData);
    const course=await createCourse(courseData);
   
    
    return course;
  } catch (error) {
    throw new Error('Failed to create course');
  }
};
export {fetchCourses,addCourse}