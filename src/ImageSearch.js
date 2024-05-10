import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AWS from "aws-sdk";

function ImageSearch() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:8081/images');
                const imageObjects = response.data.map(image => ({
                    ...image,
                    src: `data:image/png;base64,${image.image_data}`
                }));
                setImages(imageObjects);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);
    const [imagess3, setImagess3] = useState([]);

    useEffect(() => {
      fetchImagess3();
    }, []);
  
    const fetchImagess3 = async () => {
      const S3_BUCKET = "";
      const REGION = "";
  
      AWS.config.update({
        accessKeyId: "",
        secretAccessKey: "",
      });
  
      const s3 = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
      });
  
      const params = {
        Bucket: S3_BUCKET,
      };
  
      try {
        const data = await s3.listObjects(params).promise();
        setImagess3(data.Contents);
      } catch (error) {
        console.error("Error fetching images from S3:", error);
      }
    };
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

        <div>
            <h1>Image Gallery from RDS</h1>
            <div>
                {images.map((image) => (
                    <img
                        key={image.id}
                        src={image.src}
                        alt={image.image_name}
                        style={{ width: '200px', height: '200px', margin: '10px' }}
                    />
                ))}
            </div>
        </div>
        <div>
        <h1>Image Gallery from S3</h1>
        <div>
            {imagess3.map((image, index) => (
              <div key={index} className="d-flex align-items-center">
                <img
                  src={`https://<bucket_name>.s3.amazonaws.com/${image.Key}`}
                  alt={image.Key}
                  style={{ width: "100px", height: "100px", marginRight: "10px" }}
                />
                </div>
            
            ))}
            </div>
          </div>
      </div>

    );
}

export default ImageSearch;
