import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import http from '../../http';

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      const result = await http.get('/student');
      setStudents(result.data);
    };
    getStudents();
  }, []);

  const handleDeleteButton = async (id) => {
    try {
      await http.delete(`student/${id}`);
      let copyStudents = [...students];
      copyStudents = copyStudents.filter((student) => student.id !== id);
      setStudents(copyStudents);
    } catch (error) {}
  };

  return (
    <div>
      <h2>Alunos</h2>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Turma</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, i) => (
            <tr key={i}>
              <td>{student.id}</td>

              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>
                {student.studentClass !== null ? student.studentClass : '-'}
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteButton(student.id)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="students/create">
        <Button>Cadastrar Aluno</Button>
      </Link>
    </div>
  );
}
