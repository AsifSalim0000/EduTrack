
import Course from '../domain/Course.js';

const getCourses = async (page, search) => {
  const limit = 10; // Items per page
  const skip = (page - 1) * limit;
  
  const query = search ? { title: new RegExp(search, 'i') } : {};
  const courses = await Course.find(query).skip(skip).limit(limit).populate('instructor');
  const totalCourses = await Course.countDocuments(query);

  return { data: courses, totalPages: Math.ceil(totalCourses / limit) };
};

const createCourse = async (courseData) => {
  const newCourse = new Course(courseData);
  await newCourse.save();
  
  return newCourse;
};
export {getCourses,createCourse}