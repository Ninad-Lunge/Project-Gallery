import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProject from './components/AddProjects';
import Categories from './components/Categories';
import Tags from './components/Tags';
import Testimonials from './components/Testimonials';
import Technologies from './components/Technologies';
import VerticalNavbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <VerticalNavbar />
        <div className="flex-auto mt-5">
          <Routes>
            <Route path="/" element={<AddProject />} />
            <Route path="/category" element={<Categories />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/technology" element={<Technologies />} />
            <Route path="/testimonial" element={<Testimonials />} />
              {/* <Route path="blogs" element={<Blogs />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NoPage />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;