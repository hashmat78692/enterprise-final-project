import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';


function Employee() {

    const [ employee, setEmployee ] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8081/')
        .then(res => setEmployee(res.data))
        .catch(err => console.log(err));
    },[])

const handleDelete = async (id) => {
    try{
        await axios.delete('http://localhost:8081/employee/'+id)
        window.location.reload()
    }catch(err){
        console.log(err);
    }
    }


  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded'>
            <Link to='/create' className='btn btn-success'>Add +</Link>
            <table className='table'>
                <thead>
                    <tr>
                    <th>
                        First Name:
                    </th>
                    <th>
                        Last Name:
                    </th>
                    <th>
                        Department:
                    </th>
                    <th>
                        Action
                    </th>
                    </tr>
                </thead>
                <tbody>

                    {
                        employee.map((data,i)=>(
                            <tr key={i}>
                                <td>{data.first_name}</td>
                                <td>{data.last_name}</td>
                                <td>{data.department}</td>
                                <td>
                                    <Link to={`update/${data.id}`} className='btn btn-primary'>Update</Link>
                                    <button className='btn btn-danger ms-2' onClick={e => handleDelete(data.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Employee
