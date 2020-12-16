import React, { useState } from 'react';
import http from '../../http';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function CreateTeacher() {
  const history = useHistory();
  const [name, setName] = useState('');

  const handleRegisterButtonClick = async () => {
    try {
      await http.post('teacher', { name });
      history.push('/teachers');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Cadastrar Professor</h2>
      <Form>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Row className="justify-content-center">
            <Col lg={4}>
              <Form.Label>Nome do Professor</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Row>
        </Form.Group>
      </Form>
      <Button onClick={handleRegisterButtonClick}>Cadastrar</Button>
    </div>
  );
}
