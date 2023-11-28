import React, { useState, useEffect } from 'react';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('https://dummy.restapiexample.com/api/v1/employees')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setEmployees(data.data);
        } else {
          console.error('Failed to fetch employee data');
        }
      })
      .catch(error => console.error('Error fetching employee data:', error));
  }, []);

  return (
    <div>
      <h1>Employee Details</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.employee_name}</td>
              <td>{employee.employee_salary}</td>
              <td>{employee.employee_age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
