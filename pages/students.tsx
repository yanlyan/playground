import React, { useEffect, useState } from "react";
import { v4 as uuid }from "uuid";

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('/api/students').then(response => response.json())
    .then(data => {
      setStudents(data);
    });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Avatar</th>
        </tr>
      </thead>
      <tbody>
        {students.map(s => {
          return <tr key={uuid()}>
            <td>{s.name}</td>
            <td>{s.email}</td>
            <td><a href="s.avatar" target="_blank">{s.avatar}</a></td>
          </tr>
        })}
      </tbody>
    </table>
  )
}

export default Students;