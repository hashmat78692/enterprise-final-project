import React from 'react'
import { Link } from 'react-router-dom';
function ContactUs() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="container-fluid">
        <Link to='/' className='navbar-brand mb-0 h1'>Memory Safe</Link>
        <div className="navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to='/create' className='nav-link'>Register</Link>
                </li>
                <li className="nav-item">
                    <Link to='/imagesearch' className='nav-link'>Search</Link>
                </li>
                <li className="nav-item">
                    <Link to='/imageupload' className='nav-link'>Upload using RDS</Link>
                </li>
                <li className="nav-item">
                    <Link to='/s3imageupload' className='nav-link'>Upload using S3</Link>
                </li>
                <li className="nav-item">
                    <Link to='/about' className='nav-link'>About</Link>
                </li>
                <li className="nav-item">
                    <Link to='/contactus' className='nav-link'>ContactUs</Link>
                </li>
            </ul>
        </div>
    </div>
</nav>
    </div>
  )
}

export default ContactUs
