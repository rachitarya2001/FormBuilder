import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CreateForm = () => {
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState('');

  const navigate = useNavigate();

  // Handle form submission
  const handleSaveForm = (e) => {
    e.preventDefault();

    if (!title || !email || !password || !date) {
      alert('Please fill in all fields');
      return;
    }

    const formData = { title, email, password, date };

    // Send form data to the backend
    fetch('http://localhost:5000/form/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Form saved successfully!');
        navigate('/'); // Navigate back to the form list
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error saving form');
      });
  };

  return (
    <div className="form-container">
      <h2>Create Form</h2>
      {/* Form Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Form Title"
        className="input-field"
      />
      
      {/* Email Field */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="input-field"
      />

      {/* Password Field */}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="input-field"
      />
      
      {/* Date Field */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="input-field"
      />

      {/* Save Form Button */}
      <button onClick={handleSaveForm} className="save-form-btn">
        Save Form
      </button>
    </div>
  );
};

export default CreateForm;
