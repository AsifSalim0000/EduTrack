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
    
  }),
});

export const { useCreateInstructorMutation } = instructorApiSlice;

