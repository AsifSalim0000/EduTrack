import { apiSlice } from './apiSlice';

const INSTRUCTOR_URL = '/instructor';

export const instructorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createInstructor: builder.mutation({
      query: (instructorData) => ({
        url: `${INSTRUCTOR_URL}/create-instructor`,
        method: 'POST',
        body: instructorData,
      }),
    }),
    fetchCourses: builder.query({
      query: ({ page, search }) => ({
        url: `${INSTRUCTOR_URL}/courses`,
        params: { page, search },
      }),
    }),
    createCourse: builder.mutation({
      query: (courseData) => {
        const formData = new FormData();
        formData.append('title', courseData.title);
        formData.append('description', courseData.description);
        formData.append('thumbnail', courseData.thumbnail);
        formData.append('trailer', courseData.trailer); // Add trailer if needed

        return {
          url: `${INSTRUCTOR_URL}/create-course`,
          method: 'POST',
          body: formData,
        };
      },
    }),
    fetchCourseDetails: builder.query({
      query: (courseId) => ({
        url: `${INSTRUCTOR_URL}/courses/${courseId}`,
      }),
    }),
    saveCourseDetails: builder.mutation({
      query: (courseData) => {
        const formData = new FormData();
        formData.append('title', courseData.title);
        formData.append('description', courseData.description);
        formData.append('thumbnail', courseData.thumbnail);
        formData.append('trailer', courseData.trailer); // Add trailer if needed
        formData.append('whatToTeach', JSON.stringify(courseData.whatToTeach));
        formData.append('curriculum', JSON.stringify(courseData.curriculum));

        return {
          url: `${INSTRUCTOR_URL}/save-course-details`,
          method: 'POST',
          body: formData,
        };
      },
    }),
    saveChapters: builder.mutation({
      query: (data) => ({
        url: `${INSTRUCTOR_URL}/save-chapters`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateInstructorMutation,
  useFetchCoursesQuery,
  useCreateCourseMutation,
  useFetchCourseDetailsQuery,
  useSaveCourseDetailsMutation,
  useSaveChaptersMutation,
} = instructorApiSlice;
