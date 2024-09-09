import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Row, Col, Card } from 'react-bootstrap';
import DraggableChapters from '../../components/instructor/DraggableChapters';
import { useFetchCourseDetailsQuery, useSaveCourseDetailsMutation, useSaveChaptersMutation } from '../../store/instructorApiSlice';

const CourseContentPage = () => {
  const [activeTab, setActiveTab] = useState('advance');
  const [courseDetails, setCourseDetails] = useState({
    thumbnail: null,
    trailer: null,
    description: '',
    whatToTeach: [''],
    curriculum: [], // Initialize with an empty array
  });

  const { data, error, isLoading } = useFetchCourseDetailsQuery(); // Fetch course details
  const [saveCourseDetails] = useSaveCourseDetailsMutation(); // Mutation to save course details
  const [saveChapters] = useSaveChaptersMutation(); // Mutation to save chapters

  useEffect(() => {
    if (data) {
      setCourseDetails(data); // Initialize courseDetails with fetched data
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails({ ...courseDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setCourseDetails({
      ...courseDetails,
      [name]: files[0], // Store the file object
    });
  };

  const handleWhatToTeachChange = (index, value) => {
    const updatedWhatToTeach = [...courseDetails.whatToTeach];
    updatedWhatToTeach[index] = value;
    setCourseDetails({ ...courseDetails, whatToTeach: updatedWhatToTeach });
  };

  const addWhatToTeachField = () => {
    setCourseDetails({
      ...courseDetails,
      whatToTeach: [...courseDetails.whatToTeach, ''],
    });
  };

  const removeWhatToTeachField = (index) => {
    const updatedWhatToTeach = courseDetails.whatToTeach.filter((_, i) => i !== index);
    setCourseDetails({ ...courseDetails, whatToTeach: updatedWhatToTeach });
  };

  const handleSave = async () => {
    try {
      // Save course details
      await saveCourseDetails(courseDetails);

      // Save chapters separately if needed
      await saveChapters(courseDetails.curriculum);
      
      alert('Course details and chapters saved successfully!');
    } catch (error) {
      console.error('Failed to save course details or chapters:', error);
      alert('Failed to save course details or chapters.');
    }
  };

  return (
    <Container className="mt-5 bg-white shadow p-3">
      {/* Top Navigation */}
      <nav className="nav nav-tabs">
        <a
          className={`nav-link ${activeTab === 'advance' ? 'active' : ''}`}
          href="#"
          onClick={() => setActiveTab('advance')}
        >
          Advance Information
        </a>
        <a
          className={`nav-link ${activeTab === 'curriculum' ? 'active' : ''}`}
          href="#"
          onClick={() => setActiveTab('curriculum')}
        >
          Curriculum
        </a>
      </nav>

      {/* Advance Information Tab */}
      {activeTab === 'advance' && (
        <div className="mt-4">
          <h4>Advance Information</h4>

          <Row className="mb-4">
            {/* Course Thumbnail */}
            <Col md={6}>
              <Form.Group controlId="courseThumbnail">
                <Form.Label>Course Thumbnail</Form.Label>
                <Card className="p-3">
                  {courseDetails.thumbnail ? (
                    <img
                      src={URL.createObjectURL(courseDetails.thumbnail)}
                      className="card-img-top mb-3"
                      alt="Thumbnail"
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/200x120"
                      className="card-img-top mb-3"
                      alt="Thumbnail"
                    />
                  )}
                  <Form.Control
                    type="file"
                    accept="image/*"
                    name="thumbnail"
                    onChange={handleFileChange}
                  />
                  <small className="text-muted">
                    Supported formats: jpg, jpeg, png. Recommended size: 1200x800 pixels or 12:8 ratio.
                  </small>
                </Card>
              </Form.Group>
            </Col>

            {/* Course Trailer */}
            <Col md={6}>
              <Form.Group controlId="courseTrailer">
                <Form.Label>Course Trailer</Form.Label>
                <Card className="p-3">
                  {courseDetails.trailer ? (
                    <video
                      controls
                      src={URL.createObjectURL(courseDetails.trailer)}
                      className="card-img-top mb-3"
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/200x120"
                      className="card-img-top mb-3"
                      alt="Trailer"
                    />
                  )}
                  <Form.Control
                    type="file"
                    accept="video/*"
                    name="trailer"
                    onChange={handleFileChange}
                  />
                  <small className="text-muted">
                    Uploading a promo video can increase your course enrollment.
                  </small>
                </Card>
              </Form.Group>
            </Col>
          </Row>

          {/* Course Description */}
          <Form.Group controlId="courseDescription" className="mb-4">
            <Form.Label>Course Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="description"
              value={courseDetails.description}
              onChange={handleInputChange}
              placeholder="Enter your course description"
            />
          </Form.Group>

          {/* What you will teach */}
          <Form.Group controlId="whatYouWillTeach" className="mb-4">
            <Form.Label>What you will teach in this course (4/8)</Form.Label>
            {courseDetails.whatToTeach.map((item, index) => (
              <div key={index} className="mb-3 d-flex align-items-center">
                <Form.Control
                  type="text"
                  value={item}
                  onChange={(e) => handleWhatToTeachChange(index, e.target.value)}
                  placeholder="What you will teach in this course..."
                  className="me-2"
                />
                <Button variant="danger" onClick={() => removeWhatToTeachField(index)}>Remove</Button>
              </div>
            ))}
            <Button variant="primary" onClick={addWhatToTeachField}>Add More</Button>
          </Form.Group>
        </div>
      )}

      {/* Curriculum Tab */}
      {activeTab === 'curriculum' && (
        <div className="mt-4">
          <h4>Course Curriculum</h4>

          {/* Render DraggableChapters Component */}
          <DraggableChapters
            chapters={courseDetails.curriculum}
            setChapters={(newCurriculum) => setCourseDetails({ ...courseDetails, curriculum: newCurriculum })}
          />

          <Button variant="primary" onClick={handleSave} className="mt-3">
            Save Course Details
          </Button>
        </div>
      )}
    </Container>
  );
};

export default CourseContentPage;
