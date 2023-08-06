import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import backgroundImage from './images/background.jpg';

function Home() {
    return (
    <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: '100vh', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
    <div className='bg-white rounded p-4' style={{ width: '30%', backgroundColor: 'white'  }}>             
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h3>Home</h3>   
                <p>Select An Operation</p>
            </div>
            <div className="d-flex justify-content-center">
                <Link to={`/form`} className='btn btn-dark m-2'>Add a Webinar</Link>
                <Link to={`/view`} className='btn btn-dark m-2'>View Scheduled Webinars</Link>
            </div>
        </div>
    </div>
    );
}

export default Home;