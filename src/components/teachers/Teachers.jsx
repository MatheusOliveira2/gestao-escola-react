import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import http from '../../http';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const getTeachers = async () => {
      const result = await http.get('/teacher');
      setTeachers(result.data);
    };
    getTeachers();
  }, []);

  const handleDeleteButton = async (id) => {
    try {
      await http.delete(`teacher/${id}`);
      let copyTeachers = [...teachers];
      copyTeachers = copyTeachers.filter((teacher) => teacher.id !== id);
      setTeachers(copyTeachers);
    } catch (error) {}
  };

  return (
    <div>
      <h2>Professores</h2>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Turma</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, i) => (
            <tr key={i}>
              <td>{teacher.id}</td>

              <td>{teacher.name}</td>
              <td>
                {teacher.teacherClass !== null ? teacher.teacherClass : '-'}
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteButton(teacher.id)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/teachers/create">
        <Button>Cadastrar Professor</Button>
      </Link>
    </div>
  );
}
