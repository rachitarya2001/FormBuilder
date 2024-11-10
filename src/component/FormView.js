import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './FormView.css';

const FormView = () => {
  const { id } = useParams(); // Extract form ID from the URL
  const navigate = useNavigate(); // Hook for redirecting after form submission
  const [formData, setFormData] = useState(null);
  const [responses, setResponses] = useState({});
  const [formTitle, setFormTitle] = useState(''); // State for form title

  // Fetch form data and user's responses on load
  useEffect(() => {
    // Fetch form data
    fetch(`http://localhost:5000/form/${id}`)
      .then(response => response.json())
      .then(data => {
        setFormData(data);
        setFormTitle(data.title); // Set form title from response
      })
      .catch(error => console.error('Error fetching form:', error));

    // Fetch user's responses (if they exist)
    fetch(`http://localhost:5000/form/responses/${id}`)
      .then(response => response.json())
      .then(data => setResponses(data)) // Assuming responses are stored
      .catch(error => console.error('Error fetching responses:', error));
  }, [id]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResponses({
      ...responses,
      [name]: value,
    });
  };

  // Handle title change
  const handleTitleChange = (e) => {
    setFormTitle(e.target.value); // Update form title state
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send updated title and responses to your backend
    fetch(`http://localhost:5000/form/${id}`, {
      method: 'PUT', // Use PUT to update the form title
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: formTitle, // Include updated form title
        inputs: formData.inputs, // Send form inputs as is (no change here)
      }),
    })
      .then(() => {
        return fetch(`http://localhost:5000/form/responses/${id}`, {
          method: 'POST', // Use POST to save the response data
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(responses),
        });
      })
      .then(() => {
        alert('Form updated and submitted successfully!');
        navigate('/'); // Redirect to form list or a different page
      })
      .catch((error) => console.error('Error submitting form:', error));
  };

  if (!formData) {
    return <p>Loading form...</p>;
  }

  return (
    <div className="form-container">
      <h1>Edit Form</h1>
      {/* Editable form title */}
      <div className="form-field">
        <label>Form Title:</label>
        <input
          type="text"
          value={formTitle}
          onChange={handleTitleChange}
          placeholder="Enter form title"
          required
        />
      </div>

      <form onSubmit={handleSubmit}>
        {formData.inputs.map((input, index) => (
          <div key={index} className="form-field">
            <label>{input.type}</label>
            <input
              type={input.type}
              name={input.type} // Use type as the name for identifying inputs
              value={responses[input.type] || input.value} // Populate with responses or default value
              onChange={handleInputChange} // Handle input change
              placeholder={input.value}
              required
            />
          </div>
        ))}
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default FormView;
