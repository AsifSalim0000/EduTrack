import React, { useState, useRef } from 'react';
import { Form, Row, Col, Card, Button } from 'react-bootstrap';
import { useSaveChaptersMutation } from '../../store/instructorApiSlice';

const DraggableChapters = ({ chapters, setChapters }) => {
  const [saveChapters] = useSaveChaptersMutation();
  
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleChange = (index, field, value) => {
    const updatedChapters = [...chapters];
    updatedChapters[index][field] = value;
    setChapters(updatedChapters);
  };

  const handleDelete = (index) => {
    const updatedChapters = chapters.filter((_, i) => i !== index);
    setChapters(updatedChapters);
  };

  const handleAddChapter = (type) => {
    const newChapter = {
      title: '',
      type: type,
      content: type === 'quiz' ? { questions: [] } : '',
    };
    setChapters([...chapters, newChapter]);
  };

  const handleQuizQuestionChange = (chapterIndex, questionIndex, field, value) => {
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].content.questions[questionIndex][field] = value;
    setChapters(updatedChapters);
  };

  const handleAddQuizQuestion = (chapterIndex) => {
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].content.questions.push({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    });
    setChapters(updatedChapters);
  };

  const renderQuiz = (chapter, chapterIndex) => {
    return (
      <div>
        <Button variant="primary" onClick={() => handleAddQuizQuestion(chapterIndex)}>
          Add Quiz Question
        </Button>
        {chapter.content.questions.map((question, questionIndex) => (
          <Card className="my-3" key={questionIndex}>
            <Card.Body>
              <Form.Group>
                <Form.Label>Question</Form.Label>
                <Form.Control
                  type="text"
                  value={question.question}
                  onChange={(e) => handleQuizQuestionChange(chapterIndex, questionIndex, 'question', e.target.value)}
                  placeholder="Enter the question"
                />
              </Form.Group>
              <Row className="my-2">
                {question.options.map((option, optionIndex) => (
                  <Col key={optionIndex}>
                    <Form.Group>
                      <Form.Label>Option {optionIndex + 1}</Form.Label>
                      <Form.Control
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleQuizQuestionChange(chapterIndex, questionIndex, 'options', [
                            ...question.options.slice(0, optionIndex),
                            e.target.value,
                            ...question.options.slice(optionIndex + 1),
                          ])
                        }
                      />
                    </Form.Group>
                  </Col>
                ))}
              </Row>
              <Form.Group>
                <Form.Label>Correct Answer</Form.Label>
                <Form.Select
                  value={question.correctAnswer}
                  onChange={(e) =>
                    handleQuizQuestionChange(chapterIndex, questionIndex, 'correctAnswer', parseInt(e.target.value))
                  }
                >
                  {question.options.map((_, optionIndex) => (
                    <option key={optionIndex} value={optionIndex}>
                      Option {optionIndex + 1}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  };

  const renderContentInput = (chapter, index) => {
    if (chapter.type === 'video') {
      return (
        <Form.Group controlId={`chapterContent-${index}`}>
          <Form.Label>Upload Video</Form.Label>
          <Form.Control
            type="file"
            accept="video/*"
            onChange={(e) => handleChange(index, 'content', e.target.files[0])}
          />
        </Form.Group>
      );
    } else if (chapter.type === 'text') {
      return (
        <Form.Group controlId={`chapterContent-${index}`}>
          <Form.Label>Text Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={chapter.content}
            onChange={(e) => handleChange(index, 'content', e.target.value)}
          />
        </Form.Group>
      );
    } else if (chapter.type === 'quiz') {
      return renderQuiz(chapter, index);
    }
    return null;
  };

  const handleDragStart = (index) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    const updatedChapters = [...chapters];
    const draggedItem = updatedChapters[dragItem.current];
    updatedChapters.splice(dragItem.current, 1);
    updatedChapters.splice(dragOverItem.current, 0, draggedItem);
    setChapters(updatedChapters);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <div>
      <div className="draggable-container">
        {chapters.map((chapter, index) => (
          <div
            key={index}
            className="mb-3"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
          >
            <Card className="border rounded p-3 bg-light">
              <Card.Body>
                <Row>
                  <Col xs={1}>
                    <Button variant="light" className="drag-handle" aria-label="Drag">
                      &#x2630;
                    </Button>
                  </Col>
                  <Col>
                    <Form.Group controlId={`chapterTitle-${index}`}>
                      <Form.Label>Chapter Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={chapter.title}
                        onChange={(e) => handleChange(index, 'title', e.target.value)}
                        placeholder="Enter chapter title"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={3}>
                    <Form.Group controlId={`chapterType-${index}`}>
                      <Form.Label>Type</Form.Label>
                      <Form.Select
                        value={chapter.type}
                        onChange={(e) => handleChange(index, 'type', e.target.value)}
                      >
                        <option value="video">Video</option>
                        <option value="text">Text</option>
                        <option value="quiz">Quiz</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={2}>
                    <Button variant="danger" onClick={() => handleDelete(index)}>
                      Delete
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {renderContentInput(chapter, index)}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <Button variant="primary" onClick={() => handleAddChapter('video')} className="m-2">
        Add Video Chapter
      </Button>
      <Button variant="secondary" onClick={() => handleAddChapter('text')} className="m-2">
        Add Text Chapter
      </Button>
      <Button variant="success" onClick={() => handleAddChapter('quiz')} className="m-2">
        Add Quiz Chapter
      </Button>
    </div>
  );
};

export default DraggableChapters;
