import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Form, Modal, Table } from 'react-bootstrap';
import http from '../../http';

export default function Class() {
  const [currentClass, setCurrentClass] = useState({
    id: 0,
    name: '',
    students: [],
    teacher: null,
  });

  const [showDialog, setShowDialog] = useState(false);
  const [showDialogTeacher, setShowDialogTeacher] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState();
  const [currentTeacher, setCurrentTeacher] = useState();
  const [allTeachers, setAllTeachers] = useState([]);

  function getUrlId() {
    let params = new URL(document.location).searchParams;
    return params.get('id');
  }

  useEffect(() => {
    const getStudents = async () => {
      let resultClass = await http.get(`class/${getUrlId()}`);
      setCurrentClass(resultClass.data);

      let result = await http.get(`student`);
      result = result.data;
      result = result.filter((student) => student.studentClass === null);
      setAllStudents(result);

      result = await http.get(`teacher`);
      result = result.data;
      result = result.filter((teacher) => teacher.teacherClass === null);
      setAllTeachers(result);
    };
    getStudents();
  }, []);

  const addStudentOnClass = async () => {
    try {
      let result = await http.put(
        `student/${currentStudent}/class/${currentClass.id}`
      );
      setCurrentClass((prevState) => ({
        ...prevState,
        ['students']: [...currentClass.students, result.data[0]],
      }));

      let resultStudents = await http.get(`student`);
      resultStudents = resultStudents.data;
      resultStudents = resultStudents.filter(
        (student) => student.studentClass === null
      );
      setAllStudents(resultStudents);
      setShowDialog(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addTeacherOnClass = async () => {
    try {
      let result = await http.put(
        `teacher/${currentTeacher}/class/${currentClass.id}`
      );
      setCurrentClass((prevState) => ({
        ...prevState,
        ['teacher']: result.data[0],
      }));

      let resultTeachers = await http.get(`teacher`);
      resultTeachers = resultTeachers.data;
      resultTeachers = resultTeachers.filter(
        (teacher) => teacher.teacherClass === null
      );
      setAllTeachers(resultTeachers);
      setShowDialogTeacher(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h2>
        Alunos da {currentClass.name} - Professor:
        {currentClass.teacher !== null
          ? currentClass.teacher.name
          : 'Sem professor'}
      </h2>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {currentClass.students.map((student, i) => (
            <tr key={i}>
              <td>{student.id}</td>
              <td>{student.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showDialog}>
        <Modal.Header closeButton onClick={() => setShowDialog(false)}>
          <Modal.Title>Matricular Aluno</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Aluno</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => setCurrentStudent(e.target.value)}
                  >
                    <option>Selecione um Aluno</option>
                    {allStudents.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDialog(false)}>
            Fechar
          </Button>
          <Button
            disabled={allStudents.length > 0 ? false : true}
            variant="primary"
            onClick={() => addStudentOnClass()}
          >
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDialogTeacher}>
        <Modal.Header closeButton onClick={() => setShowDialogTeacher(false)}>
          <Modal.Title>Cadastrar Professor</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Aluno</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => setCurrentTeacher(e.target.value)}
                  >
                    <option>Selecione um Professor</option>
                    {allTeachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDialogTeacher(false)}
          >
            Fechar
          </Button>
          <Button
            disabled={allTeachers.length > 0 ? false : true}
            variant="primary"
            onClick={() => addTeacherOnClass()}
          >
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
      <Button onClick={() => setShowDialog(true)}>Adicionar Aluno</Button>
      <Button
        disabled={currentClass.teacher !== null}
        onClick={() => setShowDialogTeacher(true)}
      >
        Adicionar Professor
      </Button>
    </div>
  );
}
