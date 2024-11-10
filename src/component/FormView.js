import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./FormView.css";

const FormView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [responses, setResponses] = useState({});
  const [formTitle, setFormTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Fetch the form data
    fetch(`http://localhost:5000/form/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
        setFormTitle(data.title);
        const initialResponses = {};
        
        // Initialize responses with existing input values
        data.inputs.forEach((input, index) => {
          initialResponses[`${input.type}_${index}`] = input.value || "";
        });
        
        setResponses(initialResponses);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching form:", error);
        setLoading(false);
      });

    // Fetch responses for the form
    fetch(`http://localhost:5000/form/responses/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.responses) {
          setResponses(data.responses);
        }
      })
      .catch((error) => console.error("Error fetching responses:", error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setResponses((prevResponses) => ({
      ...prevResponses,
      [name]: value, // Update the response value directly
    }));
  };

  const handleTitleChange = (e) => {
    setFormTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validation for empty fields
    if (!formTitle) {
      alert("Form title cannot be empty");
      return;
    }
  
    // Update the form inputs with the updated responses
    const updatedInputs = formData.inputs.map((input, index) => ({
      ...input,
      value: responses[`${input.type}_${index}`], // Update the value from responses
    }));
  
    // Send updated title and inputs
    fetch(`http://localhost:5000/form/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formTitle,
        inputs: updatedInputs, // Send the updated inputs with the new values
      }),
    })
      .then(() => {
        return fetch(`http://localhost:5000/form/responses/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(responses),
        });
      })
      .then(() => {
        alert("Form updated and submitted successfully!");
  
        // Clear the form and responses after submission
        setFormTitle('');
        setResponses({});
        setFormData(null); // Clear form data state
  
        navigate("/"); // Redirect after submission
      })
      .catch((error) => console.error("Error submitting form:", error));
  };
  
  
  // Inside useEffect, clear the form data when navigating away or refetch when back
  useEffect(() => {
    setLoading(true);
  
    // Fetch the form data
    fetch(`http://localhost:5000/form/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
        setFormTitle(data.title);
        const initialResponses = {};
  
        // Initialize responses with existing input values
        data.inputs.forEach((input, index) => {
          initialResponses[`${input.type}_${index}`] = input.value || "";
        });
  
        setResponses(initialResponses);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching form:", error);
        setLoading(false);
      });
  
    // Fetch responses for the form
    fetch(`http://localhost:5000/form/responses/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.responses) {
          setResponses(data.responses); // Update the responses state with the fetched data
        }
      })
      .catch((error) => console.error("Error fetching responses:", error));
  
    return () => {
      // Clean up form data when unmounting or navigating away
      setFormData(null);
      setResponses({});
      setFormTitle('');
    };
  }, [id]);
  

  const getPlaceholder = (type) => {
    switch (type) {
      case 'email':
        return 'Enter your email';
      case 'number':
        return 'Enter a number';
      case 'text':
        return 'Enter text';
      case 'password':
        return 'Enter your password';
      default:
        return 'Enter a value';
    }
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
                name={`${input.type}_${index}`} // Use a unique name per input field
                value={responses[`${input.type}_${index}`] || ""} // Bind the value to responses
                onChange={handleInputChange}
                placeholder={getPlaceholder(input.type)} // Generic placeholder based on input type
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
