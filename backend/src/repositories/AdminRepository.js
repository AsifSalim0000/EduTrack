import Instructor from '../domain/Instructor.js';
import User from '../domain/User.js';

const acceptInstructorRequest = async (teacherId) => {
  const user = await User.findById(teacherId);
  console.log(teacherId);
  
  if (user.role === 'RequestForInstructor') {
    user.role = 'Instructor';
    await user.save();
  }
  
  return user;
};

const rejectInstructorRequest = async (teacherId) => {
  const user = await User.findById(teacherId);

  if (user.role === 'RequestForInstructor') {

    const instructorData = await Instructor.findOne({ userId: teacherId });
    
    if (instructorData) {
      await Instructor.deleteOne({ userId: teacherId });
    }

    user.role = 'Student';
    await user.save();
  }

  return user;
};

export { acceptInstructorRequest, rejectInstructorRequest };
