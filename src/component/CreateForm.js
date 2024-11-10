import React, { useState } from 'react';
import './CreateForm.css';
import { useNavigate } from 'react-router-dom';

const CreateForm = () => {
  const [formTitle, setFormTitle] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [inputFields, setInputFields] = useState([]);
  const [tempValue, setTempValue] = useState(''); // For storing input values while adding a new input

  const navigate = useNavigate();
  // Handle form title change
  const handleFormTitleChange = (e) => {
    setFormTitle(e.target.value);
  };

  // Handle input type selection (dropdown)
  const handleInputTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  // Handle temporary value change (for the input being added)
  const handleTempValueChange = (e) => {
    setTempValue(e.target.value);
  };

  // Add the input field (only when there's a value to add)
  const addInputField = () => {
    if (tempValue) {
      setInputFields([
        ...inputFields,
        { type: selectedType, value: tempValue },
      ]);
      setTempValue(''); // Reset the temporary value after adding
      setSelectedType(''); // Reset input type selection
    }
  };

  // Handle saving form values
  const handleSaveForm = (e) => {
    if(!formTitle){
      alert("please fill the details first.")
      return;
    }
    e.preventDefault(); // Prevent default form submission if this is part of a form element
  
    // Prepare the data to send to the backend
    const formData = {
      formTitle, // Include the form title
      inputs: inputFields, // Include all the input fields
    };
  
    console.log('Form Data to Send to Backend:', formData);
  
    // Send the data to your backend API
    fetch('http://localhost:5000/form/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Send the form data as a JSON payload
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Form saved successfully:', data);
        alert('Form saved successfully');
        navigate('/'); 
      })
      .catch((error) => {
        console.error('Error saving form:', error);
        alert('Failed to save form');
      });
  };
  

  return (
    <div className="form-container">
      <h2>Create Form</h2>

      {/* Form Title Input */}
      <div className="form-title">
        <label>Form Title</label>
        <input
          type="text"
          value={formTitle}
          onChange={handleFormTitleChange}
          placeholder="Enter form title"
          className="input-field"
          required
        />
      </div>

      {/* Input Type Select (Dropdown for single type selection) */}
      <div className="input-type">
        <label>Select Input Type</label>
        <select value={selectedType} onChange={handleInputTypeChange} className="input-field">
          <option value="">Select Type</option>
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="password">Password</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
        </select>
      </div>

      {/* Input Field - Only editable while adding */}
      {selectedType && (
        <>
          <div className="input-title">
            <label>
              {selectedType === 'password'
                ? 'Enter Password'
                : selectedType === 'email'
                ? 'Enter Email'
                : selectedType === 'number'
                ? 'Enter Number'
                : selectedType === 'date'
                ? 'Select Date'
                : 'Enter Text'}
            </label>
          </div>

          <div className="input-field">
            {selectedType === 'password' && (
              <input
                type="password"
                value={tempValue}
                onChange={handleTempValueChange}
                placeholder="Enter Password"
              />
            )}

            {selectedType === 'number' && (
              <input
                type="number"
                value={tempValue}
                onChange={handleTempValueChange}
                placeholder="Enter Number"
              />
            )}

            {selectedType === 'date' && (
              <input
                type="date"
                value={tempValue}
                onChange={handleTempValueChange}
              />
            )}

            {selectedType === 'email' && (
              <input
                type="email"
                value={tempValue}
                onChange={handleTempValueChange}
                placeholder="example@domain.com"
              />
            )}

            {selectedType === 'text' && (
              <input
                type="text"
                value={tempValue}
                onChange={handleTempValueChange}
                placeholder="Enter text here..."
              />
            )}
          </div>

          <button onClick={addInputField} className="add-input-btn">
            Add Input
          </button>
        </>
      )}

      {/* Display added input fields (non-editable, only show entered values) */}
      <div className="inputs-display">
  {inputFields.map((input, index) => (
    <div key={index} className="input-item">
      <label>
        {input.type === 'password'
          ? 'Password'
          : input.type === 'email'
          ? 'Email'
          : input.type === 'number'
          ? 'Number'
          : input.type === 'date'
          ? 'Selected Date'
          : 'Text'}
      </label>
      <div className="input-value">
        {input.type === 'password' ? (
          <span>{'*'.repeat(input.value.length)}</span>  // Dynamically hide password with asterisks
        ) : input.type === 'number' || input.type === 'email' || input.type === 'text' || input.type === 'date' ? (
          <span>{input.value}</span>  // Display other field values normally
        ) : null}
      </div>
    </div>
  ))}
</div>


      {/* Save Form Button */}
      <div className="save-form">
        <button onClick={handleSaveForm} className="save-form-btn">
          Save Form
        </button>
      </div>
    </div>
  );
};

export default CreateForm;
