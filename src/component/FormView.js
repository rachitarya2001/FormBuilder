import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './FormView.css';

const FormView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [responses, setResponses] = useState({});
  const [formTitle, setFormTitle] = useState('');
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching data

    // Fetch the form data
    fetch(`http://localhost:5000/form/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
        setFormTitle(data.title);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching form:', error);
        setLoading(false);
      });

    // Fetch responses for the form
    fetch(`http://localhost:5000/form/responses/${id}`)
      .then((response) => response.json())
      .then((data) => setResponses(data.responses || {})) // Ensure it's always an object
      .catch((error) => console.error('Error fetching responses:', error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResponses({
      ...responses,
      [name]: value,
    });
  };

  const handleTitleChange = (e) => {
    setFormTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (!formTitle) {
      alert('Form title cannot be empty');
      return;
    }

    // Send updated title and responses
    fetch(`http://localhost:5000/form/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: formTitle,
        inputs: formData.inputs,
      }),
    })
      .then(() => {
        return fetch(`http://localhost:5000/form/responses/${id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(responses),
        });
      })
      .then(() => {
        alert('Form updated and submitted successfully!');
        navigate('/');
      })
      .catch((error) => console.error('Error submitting form:', error));
  };

  if (loading) {
    return <p>Loading form...</p>;
  }

  return (
    <div className="form-container">
      <h1>Edit Form</h1>
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
        {formData.inputs && formData.inputs.length > 0 ? (
          formData.inputs.map((input, index) => (
            <div key={index} className="form-field">
              <label>{input.type}</label>
              <input
                type={input.type}
                name={input.type}
                value={responses[input.type] || input.value}
                onChange={handleInputChange}
                placeholder={input.value}
                required
              />
            </div>
          ))
        ) : (
          <p>No inputs available.</p>
        )}
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormView;
