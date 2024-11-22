// src/components/EmployeeList.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, updateEmployee, deleteEmployee } from '../redux/actions/actionsEmployee';

const EmployeeList = () => {
  const employees = useSelector((state) => state.employees.employees); // Ambil data employee dari Redux store
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleAddEmployee = () => {
    const newEmployee = {
      id: Date.now().toString(),
      name,
      position,
      phone,
    };
    dispatch(addEmployee(newEmployee));
    setName('');
    setPosition('');
    setPhone('');
  };

  const handleUpdateEmployee = () => {
    const updatedEmployee = {
      ...selectedEmployee,
      name,
      position,
      phone,
    };
    dispatch(updateEmployee(updatedEmployee));
    setName('');
    setPosition('');
    setPhone('');
    setSelectedEmployee(null);
  };

  const handleDeleteEmployee = (id) => {
    dispatch(deleteEmployee(id));
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setName(employee.name || '');
    setPosition(employee.position || '');
    setPhone(employee.phone || '');
  };

  return (
    <div>
      <h2>Employee List</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={selectedEmployee ? handleUpdateEmployee : handleAddEmployee}>
        {selectedEmployee ? 'Update Employee' : 'Add Employee'}
      </button>

      <ul style={{
        textAlign: 'left'
      }}>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} ({employee.position}) - {employee.phone}
            <button onClick={() => handleEditEmployee(employee)}>Edit</button>
            <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
