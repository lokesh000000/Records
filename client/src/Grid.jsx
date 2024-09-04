import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Grid = () => {
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({ name: '', age: '', email: '' });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/records');
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async () => {
    try {
      if(!newRecord.name || !newRecord.age || !newRecord.email){
        return alert("Please Enter all the details")
      }
      await axios.post('http://localhost:4000/api/records', newRecord);
      fetchRecords();
      setNewRecord({ name: '', age: '', email: '' });
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  const handleEdit = async (record) => {
    setEditing(record._id);
    setNewRecord(record);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:4000/api/records/${editing}`, newRecord);
      fetchRecords();
      setEditing(null);
      setNewRecord({ name: '', age: '', email: '' });
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/records/${id}`);
      fetchRecords();
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  return (
    <div>
      <h2>Editable Grid</h2>
      <div>
        <input
          type="text"
          name="name"
          value={newRecord.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="number"
          name="age"
          value={newRecord.age}
          onChange={handleChange}
          placeholder="Age"
        />
        <input
          type="email"
          name="email"
          value={newRecord.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {editing ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record._id}>
              <td>{record.name}</td>
              <td>{record.age}</td>
              <td>{record.email}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(record)}>Edit</button>
                <button className='delete' onClick={() => handleDelete(record._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;
