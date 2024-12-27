import React from 'react';
import Comp1 from '../../Components/comp1/comp1';
import Services from '../../Components/Services/Services';
import './Homepage.scss';
const Homepage = () => {
  return (
    <div className='homepage'>
        <Comp1/>
        <div className='services'>
          <Services/>
        </div>
        
    </div>
  )
}

export default Homepage