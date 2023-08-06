import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from './images/background.jpg';
import { useNavigate } from "react-router-dom";

const View = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    selectedDate: '',
  });

  const [showError, setShowError] = useState(false);
  const [tableData, setTableData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setShowError(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setShowError(true); 
      return;
    }

    const { selectedDate } = formData;
    const formattedDate = new Date(selectedDate).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).replace(/\//g, '-');

    axios
      .get(`http://localhost:8081/view/${formattedDate}`)
      .then((response) => {
        setTableData(response.data);
      })
      .catch((error) => {
        console.error('Error Fetching Data:', error);
      });
  };

  function handleBack() {
    navigate(`/`);
  }

  const isFormValid = () => {
    return (
      formData.selectedDate.trim() !== ''
    );
  };

  return (
    <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: '100vh', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className='bg-white rounded p-4' style={{ width: '60%', backgroundColor: 'white' }}>
        <h3 style={{ marginBottom: '20px' }}>View Scheduled Webinars</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="selectedDate"
              name="selectedDate"
              value={formData.selectedDate}
              className='form-control'
              onChange={handleInputChange}
              style={{ width: '300px' }}
            />
          </div>
          <div>
            {showError && <p className='text-danger'>Please Enter a Valid Date</p>} 
            <button className='btn btn-success m-3' type="submit" onSubmit={handleSubmit}>Submit</button>
            <button className='btn btn-danger m-3' onClick={handleBack}>Back</button>
          </div>
        </form>
        {tableData.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ddd', padding: '10px 0' }}>
              <div style={{ fontWeight: 'bold', flexBasis: '0%' }}>Date</div>
              <div style={{ fontWeight: 'bold', flexBasis: '19%' }}>Time</div>
              <div style={{ fontWeight: 'bold', flexBasis: '45%' }}>Title</div>
            </div>
            {tableData.map((row) => (
              row && ( <DropdownItem
                key={row.Id}
                date={row.Date}
                time={JSON.parse(row.JsonData).Time}
                title={JSON.parse(row.JsonData).Title}
                speaker={JSON.parse(row.JsonData).Speaker}
                designation={JSON.parse(row.JsonData).Designation}
                description={JSON.parse(row.JsonData).Description}
              />
            )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const DropdownItem = ({ date, time, title, speaker, designation, description }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={{ marginBottom: '0px' }}>
      <div onClick={handleToggle} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', paddingBottom: '5px', cursor: 'pointer', height: '20%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ fontWeight: 'bold', marginRight: '60px' }}>{date}</div>
          <div style={{ marginRight: '60px' }}>{time} IST</div>
          <div>{title}: By {speaker}</div>
        </div>
        <div style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
          ➤
        </div>
      </div>
      {expanded && (
        <div style={{ backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '4px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', marginTop: '10px' }}>
          <div style={{ fontSize: '25px', fontWeight: 'bold', marginBottom: '5px' }}>{title}</div>
          <div>{description}</div>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>By: {speaker}</div>
          <div>{designation}</div>
        </div>
      )}
    </div>
  );
};

export default View;
