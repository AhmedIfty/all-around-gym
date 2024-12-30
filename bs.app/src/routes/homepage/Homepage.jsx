import React, { useRef } from 'react';
import Comp1 from '../../Components/comp1/comp1';
import Services from '../../Components/Services/Services';
import './Homepage.scss';

const Homepage = () => {
  const footerRef = useRef(null);

  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='homepage'>
      <Comp1 scrollToFooter={scrollToFooter} />
      <div className='services'>
        <Services />
      </div>
      <footer className='footer' ref={footerRef}>
        <div className='footer-content'>
          <div className='footer-section about'>
            <h2>About Us</h2>
            <p>We are committed to helping you achieve your fitness goals with our personalized training and innovative solutions.</p>
          </div>
          <div className='footer-section contact'>
            <h2>Contact</h2>
            <p>Email: support@fitnessapp.com</p>
            <p>Phone: +584 058 4058</p>
            <p>Address: 123 Fitness Lane, Wellness City</p>
          </div>
        </div>
        <div className='footer-bottom'>
          <p>&copy; 2024 FitnessApp. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;



