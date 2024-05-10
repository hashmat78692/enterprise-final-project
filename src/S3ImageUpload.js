import AWS from "aws-sdk";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function S3ImageUpload() {
  // Create state to store file
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
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
      setImages(data.Contents);
    } catch (error) {
      console.error("Error fetching images from S3:", error);
    }
  };
  // Function to upload file to s3
  const uploadFile = async () => {
    // S3 Bucket Name
    const S3_BUCKET = "";

    // S3 Region
    const REGION = "";

    // S3 Credentials
    AWS.config.update({
      accessKeyId: "",
      secretAccessKey: "",
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    // Files Parameters

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    // Uploading file to s3

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        // File uploading progress
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    await upload.then((err, data) => {
      console.log(err);
      // Fille successfully uploaded
      alert("File uploaded successfully.");
    });
  };
  // Function to handle file and store it to file state
  const handleFileChange = (e) => {
    // Uploaded file
    const file = e.target.files[0];
    // Changing file state
    setFile(file);
  };

  const deleteImage = async (key) => {
    const S3_BUCKET = "react-app-bucket123";
    const REGION = "us-east-1";

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
      Key: key,
    };

    try {
      await s3.deleteObject(params).promise();
      // After successful deletion, fetch images again to update the list
      fetchImages();
    } catch (error) {
      console.error("Error deleting image from S3:", error);
    }
  };

  return (
    <div className="S3ImageUpload">
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
        <input type="file" className="form-control" onChange={handleFileChange} />
        <button className="btn btn-primary" onClick={uploadFile}>Upload</button>
      </div>
    </div>
    </div>
    <div>
            {images.map((image, index) => (
              <div key={index} className="d-flex align-items-center">
                <img
                  src={`https://react-app-bucket123.s3.amazonaws.com/${image.Key}`}
                  alt={image.Key}
                  style={{ width: "100px", height: "100px", marginRight: "10px" }}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => deleteImage(image.Key)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
    </div>
  );
}

export default S3ImageUpload;
