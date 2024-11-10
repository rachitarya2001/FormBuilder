import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './FormView.css'; // Importing the CSS file
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const FormView = () => {
  const { id } = useParams(); // Extract form ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track if in edit mode
  const [updatedData, setUpdatedData] = useState({}); // Track edited form data

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/form/${id}`)
        .then(response => response.json())
        .then(data => {
          if (data.message === 'Form not found') {
            setFormData(null); // Handle form not found case
          } else {
            setFormData(data);
            setUpdatedData(data); // Initialize updatedData with fetched data
          }
        })
        .catch(error => console.error('Error fetching form:', error));
    }
  }, [id]);

  // Handle input changes for form editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  };

  // Handle form submission (PUT request to update form data)
  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log('Submitting updated form data:', updatedData);

    fetch(`http://localhost:5000/form/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Form updated:', data);
        // If the response contains the updated form data, proceed
        if (data._id) {
          setFormData(data); // Update formData with the new data
          setIsEditing(false); // Exit edit mode
          alert('Updating form successfully');
          navigate('/'); // Redirect to the form list page
        } else {
          alert('Error updating form');
        }
      })
      .catch(error => {
        console.error('Error updating form:', error);
        alert('Error updating form');
      });
  };


  if (!formData) {
    return <p className="error-message">Form not found</p>; // Display message if form is not found
  }

  return (
    <div className="form-container">
      <h1 className="form-title">{formData.title}</h1>
      {isEditing ? (
        <form onSubmit={handleFormSubmit}>
          <div className="form-details">
            <label>
              <strong>Title:</strong>
              <input
                type="text"
                name="title"
                value={updatedData.title}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <strong>Email:</strong>
              <input
                type="email"
                name="email"
                value={updatedData.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <strong>Password:</strong>
              <input
                type="password"
                name="password"
                value={updatedData.password}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <strong>Date:</strong>
              <input
                type="date"
                name="date"
                value={updatedData.date}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <button type="submit" className="save-button">Save</button>
          <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div className="form-details">
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Password:</strong> {formData.password}</p>
          <p><strong>Date:</strong> {formData.date}</p>
          <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default FormView;
