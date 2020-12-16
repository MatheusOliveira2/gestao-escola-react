import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import http from '../../http';

export default function Class() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const getClasses = async () => {
      const result = await http.get('/class');
      setClasses(result.data);
    };
    getClasses();
  }, []);

  const handleRowClick = (id) => {
    console.log(id);
  };

  const handleDeleteButton = async (id) => {
    try {
      await http.delete(`class/${id}`);
      let copyClasses = [...classes];
      copyClasses = copyClasses.filter((schoolClass) => schoolClass.id !== id);
      setClasses(copyClasses);
    } catch (error) {}
  };

  return (
    <div>
      <h2>Turmas</h2>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Número de Alunos</th>
            <th>Professor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((schoolClass, i) => (
            <tr key={i}>
              <Link to={`classes/info?id=${schoolClass.id}`}>
                <td onClick={() => handleRowClick(schoolClass.id)}>
                  {schoolClass.id}
                </td>
              </Link>
              <td>{schoolClass.name}</td>
              <td>{schoolClass.students.length}</td>
              <td>
                {schoolClass.teacher !== null ? schoolClass.teacher.name : '-'}
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteButton(schoolClass.id)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
