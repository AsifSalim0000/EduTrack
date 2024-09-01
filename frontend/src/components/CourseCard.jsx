import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './CourseCard.css';

const CourseCard = ({ image, title, price, rating }) => (
  <Card className="course-card h-100">
    <div className="image-container">
      <Card.Img variant="top" src={image} className="course-image" />
      <div className="overlay">
        <Button variant="outline-light">Add to Cart</Button>
        <Button variant="outline-light" className="ms-2">Wishlist</Button>
      </div>
    </div>
    <Card.Body>
      <Card.Title className="course-title">{title}</Card.Title>
      <Card.Text className="course-price">Price: {price}</Card.Text>
      <Card.Text className="course-rating">Rating: {rating} ★</Card.Text>
    </Card.Body>
  </Card>
);

export default CourseCard;
