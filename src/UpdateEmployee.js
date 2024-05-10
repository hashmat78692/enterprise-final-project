import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function UpdateEmployee() {


    const[firstName,setFirstName] = useState('');
    const[lastName,setLastName] = useState('');
    const[department,setDepartment] = useState('');
    const { id } = useParams();

    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        console.log(id);
        axios.put('http://localhost:8081/update/'+id, {firstName,lastName,department})
        .then(res => {
            console.log(res);
            navigate('/');
        }).catch(err =>
            console.log(err));
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
            <h2>Update Employee</h2>
            <div className='mb-2'>
                <label htmlFor="">First Name:</label>
                <input type="text" placeholder='Enter First Name' className='form-control' 
                onChange={e => setFirstName(e.target.value)}/>

            </div>
            <div className='mb-2'>
                <label htmlFor="">Last Name:</label>
                <input type="text" placeholder='Enter Last Name' className='form-control' 
                onChange={e => setLastName(e.target.value)}/>

            </div>
            <div className='mb-2'>
                <label htmlFor="">Department:</label>
                <input type="text" placeholder='Enter Department' className='form-control' 
                onChange={e => setDepartment(e.target.value)}/>

            </div>
            <button className='btn btn-success'>Update</button>
        </form>

    </div>
    </div>
  )
}

export default UpdateEmployee
