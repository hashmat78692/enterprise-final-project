import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Employee from './Employee';
import CreateEmployee from './CreateEmployee';
import UpdateEmployee from './UpdateEmployee';
import Home from './Home';
import ImageSearch from './ImageSearch';
import ImageUpload from './ImageUpload';
import ContactUs from './ContactUs';
import About from './About';
import S3ImageUpload from './S3ImageUpload';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/employee' element={<Employee />}></Route>
        <Route path='/create' element={<CreateEmployee />}></Route>
        <Route path='/update/:id' element={<UpdateEmployee />}></Route>
        <Route path='/imagesearch' element={<ImageSearch />}></Route>
        <Route path='/imageupload' element={<ImageUpload />}></Route>
        <Route path='/s3imageupload' element={<S3ImageUpload />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contactus' element={<ContactUs />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
