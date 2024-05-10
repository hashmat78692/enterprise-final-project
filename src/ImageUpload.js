import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ImageUpload() {
    const [image, setImage] = useState(null);


    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);

        try {
            await axios.post('http://localhost:8081/imageupload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Image uploaded successfully');
            this.props.history.push('/')
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const [fetchimages, setFetchimages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:8081/images');
                const imageObjects = response.data.map(image => ({
                    ...image,
                    src: `data:image/png;base64,${image.image_data}`
                }));
                setFetchimages(imageObjects);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);
    const handleDelete = async (id) => {
        try{
            await axios.delete('http://localhost:8081/image/'+id)
            window.location.reload()
        }catch(err){
            console.log(err);
        }
        }
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
        <div className="row justify-content-center mt-5">
    <div className="col-md-6">
        <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
            <div className="mb-3">
                <input type="file" className="form-control" onChange={handleImageChange} />
            </div>
            <button type="submit" className="btn btn-primary">Upload Image</button>
        </form>
    </div>
</div>

<div>
            <h1>Image Gallery</h1>
            <div>
            {fetchimages.map((image) => (
                        <div key={image.id}>
                            <img
                                src={image.src}
                                alt={image.image_name}
                                style={{ width: '200px', height: '200px', margin: '10px' }}
                            />
                            <button onClick={e => handleDelete(image.id)} className="btn btn-danger">Delete</button>
                        </div>
                    ))}
            </div>
        </div>

      </div>
 
    );
}

export default ImageUpload;

