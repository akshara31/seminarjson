import React, { useState } from 'react'
import axios from 'axios';
import backgroundImage from './images/background.jpg';
import { useNavigate } from "react-router-dom";

const Form = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      Date: '',
      Time: '',
      Title: '',
      Speaker: '',
      Designation: '',
      Description: '',
      Destination: ''
    });

    const [showError, setShowError] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'Time') {

        const currentDate = new Date().toISOString().split('T')[0];
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

        if (formData.Date === currentDate && value < currentTime) {
            return;
        }
      }
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setShowError(false);
      };

    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isFormValid()) {
          setShowError(true); 
          return;
        }

        const dateParts = formData.Date.split('-');
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

        const databaseData = {
          Date: formattedDate,
          Destination: formData.Destination,
          Time: formData.Time,
          Title: formData.Title,
          Speaker: formData.Speaker,
          Designation: formData.Designation,
          Description: formData.Description,
        };

    
        axios.post('http://localhost:8081/form', databaseData)
          .then(response => {
            console.log('Data stored successfully!', response);
            setFormData({
              Date: '',
              Time: '',
              Title: '',
              Speaker: '',
              Designation: '',
              Description: '', 
              Destination: ''
            });
            navigate(`/`); 
          })
          .catch(error => {
            console.error('Error storing data:', error);
          });
      };

      function handleBack(){
        navigate(`/`);
      }

    const isFormValid = () => {
        return (
            formData.Date.trim() !== '' &&
            formData.Time.trim() !== '' &&
            formData.Title.trim() !== '' &&
            formData.Speaker.trim() !== '' &&
            formData.Designation.trim() !== '' &&
            formData.Description.trim() !== '' &&
            formData.Destination.trim() !== ''
        );
    };

      return (
      <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: '100vh', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className='bg-white rounded p-4' style={{ width: '30%', backgroundColor: 'white'  }}>   
      <h3>Add a Webinar</h3>          
          <form onSubmit={handleSubmit}>
            <div className='mb-2'>
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="Date"
                name="Date"
                value={formData.Date}
                min={today}
                className='form-control'
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-2'>
              <label htmlFor="time">Time:</label>
              <input
                type="time"
                id="Time"
                name="Time"
                value={formData.Time}
                className='form-control'
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-2'>
              <label htmlFor="title">Title:</label>
              <input
              type="text"
              id="Title"
              name="Title"
              value={formData.Title}
              maxLength={50}
              className='form-control'
              onChange={handleInputChange}
              />
              </div>
            <div className='mb-2'>
              <label htmlFor="title">Speaker:</label>
              <input
              type="text"
              id="Speaker"
              name="Speaker"
              value={formData.Speaker}
              maxLength={50}
              className='form-control'
              onChange={handleInputChange}
              />
              </div>
            <div className='mb-2'>
              <label htmlFor="title">Designation:</label>
              <input
              type="text"
              id="Designation"
              name="Designation"
              value={formData.Designation}
              maxLength={50}
              className='form-control'
              onChange={handleInputChange}/>
              </div>
            <div className='mb-2'>
              <label htmlFor="title">Description:</label>
              <input
              type="text"
              id="Description"
              name="Description"
              value={formData.Description}
              
              className='form-control'
              onChange={handleInputChange}/>
              </div>
            <div className='mb-2'>
              <label htmlFor="title">Destination:</label>
              <input
              type="text"
              id="Destination"
              name="Destination"
              value={formData.Destination}
              maxLength={50}
              className='form-control'
              onChange={handleInputChange}/>
              </div>
              {showError && <p className='text-danger'>Please Enter All Fields</p>} 
              <button className='btn btn-success m-3' type="submit" onSubmit={handleSubmit}>Submit</button>
              <button className='btn btn-danger m-3' onClick={handleBack}>Back</button>            
          </form>
      </div>
  </div>
  );
};

export default Form;
