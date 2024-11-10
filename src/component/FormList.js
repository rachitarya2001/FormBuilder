import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FormList.css';

const FormList = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/form')
      .then((response) => response.json())
      .then((data) => setForms(data))
      .catch((error) => console.error('Error fetching forms:', error));
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this form?');

    if (confirmed) {
      fetch(`http://localhost:5000/form/${id}`, {
        method: 'DELETE',
      })
        .then(() => setForms(forms.filter((form) => form._id !== id)))
        .catch((error) => console.error('Error deleting form:', error));
    }
  };

  return (
    <div className="form-list-container">
      <h2>All Forms</h2>
      <div className="create-form-btn">
        <Link to="/form/create" className="create-btn">
          Create New Form
        </Link>
      </div>
      <div className="form-list">
        {forms.map((form) => (
          <div className="form-item" key={form._id}>
            <h3>{form.title}</h3>
            <Link to={`/form/${form._id}`} className="view-btn">Edit</Link>
            <button onClick={() => handleDelete(form._id)} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormList;
