import React, { useState } from 'react';
import { Table, Button, Pagination, FormControl } from 'react-bootstrap';
import { useFetchTeachersQuery, useToggleBlockTeacherMutation } from '../../store/adminApiSlice';

const AdminTeachers = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: teachersData, refetch } = useFetchTeachersQuery({ page, limit: 10 });
  const [toggleBlockTeacher] = useToggleBlockTeacherMutation();

  const handleToggleBlock = async (teacherId) => {
    try {
      await toggleBlockTeacher(teacherId).unwrap();
      refetch();  
    } catch (err) {
      console.error('Failed to toggle block status: ', err);
    }
  };

  const filteredTeachers = teachersData?.teachers?.filter((teacher) => {
    const username = teacher.username || '';
    const email = teacher.email || '';
    return username.toLowerCase().includes(searchTerm.toLowerCase()) ||
           email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="admin-teachers">
      <h2>Manage Teachers</h2>
      <FormControl
        type="text"
        placeholder="Search by username or email"
        className="mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table striped bordered hover responsive className="mt-4">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Rating</th>
            <th>No. of Courses</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTeachers?.map(teacher => (
            <tr key={teacher._id}>
              <td>{teacher.userId.username || 'N/A'}</td>
              <td>{teacher.userId.email || 'N/A'}</td>
              <td>{teacher.userId.rating || 'N/A'}</td>
              <td>{teacher.userId.courses?.length || 0}</td>
              <td>
              <Button
                  variant={teacher.userId.status === 'blocked' ? 'danger' : 'success'}
                  onClick={() => handleToggleBlock(teacher._id)}
                >
                  {teacher.userId.status === 'blocked' ? 'Unblock' : 'Block'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {/* Pagination controls */}
      </Pagination>
    </div>
  );
};

export default AdminTeachers;
