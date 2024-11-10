import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FormList.css'; // Import the CSS file for styling

const FormList = () => {
  const [forms, setForms] = useState([]);

  // Fetch forms on component mount
  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = () => {
    fetch('http://localhost:5000/form')
      .then((response) => response.json())
      .then((data) => setForms(data))
      .catch((error) => console.error('Error fetching forms:', error));
  };

  // Function to delete a form
  // const handleDelete = (id) => {
  //   console.log(`Deleting form with ID: ${id}`);  // Add this log for debugging
    
  //   // Use a simple JavaScript confirm dialog for confirmation
  //   const confirmed = window.confirm('Are you sure you want to delete this form? This action cannot be undone.');
    
  //   if (confirmed) {
  //     // If the user confirms, proceed with the DELETE request
  //     fetch(`http://localhost:5000/form/${id}`, {
  //       method: 'DELETE',
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           setForms(forms.filter((form) => form._id !== id));
  //           alert('Form deleted successfully');
  //         } else {
  //           console.error('Error deleting form');
  //           alert('Error deleting form');
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Error deleting form:', error);
  //         alert('Error deleting form');
  //       });
  //   } else {
  //     // If user cancels, log cancellation
  //     console.log('Form deletion cancelled');
  //   }
  // };

  const handleDelete = (id) => {
    console.log(`Deleting form with ID: ${id}`);  // Add this log for debugging
  
    // Use a simple JavaScript confirm dialog for confirmation
    const confirmed = window.confirm('Are you sure you want to delete this form? This action cannot be undone.');
  
    if (confirmed) {
      // If the form has an ID, proceed with the DELETE request
      if (id) {
        fetch(`http://localhost:5000/form/${id}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              setForms(forms.filter((form) => form._id !== id));  // Remove by _id
              alert('Form deleted successfully');
            } else {
              console.error('Error deleting form');
              alert('Error deleting form');
            }
          })
          .catch((error) => {
            console.error('Error deleting form:', error);
            alert('Error deleting form');
          });
      } else {
        // If the form does not have an ID, remove it directly from the list by checking for undefined _id
        setForms(forms.filter((form) => form._id !== undefined)); // Filter out forms without _id
        alert('Form deleted successfully');
      }
    } else {
      // If user cancels, log cancellation
      console.log('Form deletion cancelled');
    }
  };
  
  
  
  
  


  return (
    <div className="form-list-container">
      <h2 className="form-list-title">All Forms</h2>
      <div className="create-form-btn">
        <Link to="/form/create" className="create-btn">
          Create New Form
        </Link>
      </div>
      <div className="form-list">
        {forms.length > 0 ? (
          forms.map((form) => (
            <div className="form-item" key={form._id}>
              <div className="form-info">
                <h3 className="form-title">{form.title}</h3>
                <p className="form-date">
                  Created on: {new Date(form.date).toLocaleDateString()}
                </p>
              </div>
              <div className="form-actions">
                <Link to={`/form/${form._id}`} className="view-btn">View</Link>
                <button 
                  onClick={() => handleDelete(form._id)} 
                  className="del-btn">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No forms available. Create one to get started!</p>
        )}
      </div>
    </div>
  );
};

export default FormList;
