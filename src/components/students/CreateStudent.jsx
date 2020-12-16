import React, { useState } from 'react';
import http from '../../http';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function CreateStudent() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);

  const handleRegisterButtonClick = async () => {
    try {
      await http.post('student', { name, age });
      history.push('/students');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Row>
            <Col lg={4}>
              <Form.Label>Nome do Aluno</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col lg={4}>
              <Form.Label>Idade do Aluno</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setAge(e.target.value)}
              />
            </Col>
          </Row>
        </Form.Group>
      </Form>
      <Button onClick={handleRegisterButtonClick}>Cadastrar</Button>
    </div>
  );
}
