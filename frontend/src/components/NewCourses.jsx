import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CourseCard from './CourseCard';
import './CourseCard.css';
import hero from '../assets/hero.png'
const NewCourses = () => {
  return (
    <Container className="new-courses my-5">
      <h2 className="text-center mb-4">New Courses</h2>
      <Row>
        <Col md={3} sm={6} className="mb-4">
          <CourseCard
            image={hero}
            title="Course 1"
            price="$99"
            rating="4.5"
          />
        </Col>
        <Col md={3} sm={6} className="mb-4">
          <CourseCard
            image={hero}
            title="Course 2"
            price="$149"
            rating="4.7"
          />
        </Col>
        <Col md={3} sm={6} className="mb-4">
          <CourseCard
            image={hero}
            title="Course 3"
            price="$199"
            rating="4.9"
          />
        </Col>
        <Col md={3} sm={6} className="mb-4">
          <CourseCard
            image={hero}
            title="Course 4"
            price="$249"
            rating="4.8"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default NewCourses;
