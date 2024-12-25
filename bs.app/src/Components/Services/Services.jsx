import React from 'react';
import './Services.scss';
import { loadStripe } from '@stripe/stripe-js';
import basic_icon from '../../Assects/basic_icon.png';
import advance_icon from '../../Assects/advance_icon.png';
import pro_icon from '../../Assects/pro_icon.png';

// Load Stripe public key
const stripePromise = loadStripe('pk_test_51QYvzaJi9PDA9XsNPnfEQ0v4VYjur0bFGkfFtJBF0mAiumlJoyzKYtD7ARaGDlGPaY11F6WJMJE98H1KEoPsdxbF00ovNfFrGl');

const Services = () => {
  const handlePayment = async (amount, planType) => {
    try {
      // Store the selected planType locally
      localStorage.setItem('selectedPlanType', planType);

      const response = await fetch('http://localhost:5000/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, planType }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;

      const { error } = await stripe.redirectToCheckout({
        sessionId, // Use the session ID returned from the backend
      });

      if (error) {
        console.error('Stripe Checkout error:', error.message);
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="services">
      <div className="service">
        <div className="service-header">Basic</div>
        <div className="service-body">
          <p>Basic Service Package</p>
          <h3>$15</h3>
          <ul>
            <li>✔ Feature 1</li>
            <li>✔ Feature 2</li>
            <li>✔ Feature 3</li>
          </ul>
        </div>
        <div className="caption" onClick={() => handlePayment(15, 'basic')}>
          <img src={basic_icon} alt="Basic Icon" />
          <p>Choose Basic</p>
        </div>
      </div>

      <div className="service">
        <div className="service-header">Advanced</div>
        <div className="service-body">
          <p>Advanced Service Package</p>
          <h3>$25</h3>
          <ul>
            <li>✔ Feature 1</li>
            <li>✔ Feature 2</li>
            <li>✔ Feature 3</li>
          </ul>
        </div>
        <div className="caption" onClick={() => handlePayment(25, 'advanced')}>
          <img src={advance_icon} alt="Advanced Icon" />
          <p>Choose Advanced</p>
        </div>
      </div>

      <div className="service">
        <div className="service-header">Pro</div>
        <div className="service-body">
          <p>Pro Service Package</p>
          <h3>$50</h3>
          <ul>
            <li>✔ Feature 1</li>
            <li>✔ Feature 2</li>
            <li>✔ Feature 3</li>
          </ul>
        </div>
        <div className="caption" onClick={() => handlePayment(50, 'pro')}>
          <img src={pro_icon} alt="Pro Icon" />
          <p>Choose Pro</p>
        </div>
      </div>
    </div>
  );
};

export default Services;

// import React from 'react'
// import './Services.scss'
// import { loadStripe } from '@stripe/stripe-js';
// import basic from '../../Assects/basic4.jpg'
// import advance from '../../Assects/advance.jpg'
// import pro from '../../Assects/pro3.jpg'
// import basic_icon from '../../Assects/basic_icon.png'
// import advance_icon from '../../Assects/advance_icon.png'
// import pro_icon from '../../Assects/pro_icon.png'
// const stripePromise = loadStripe('pk_test_51QYvzaJi9PDA9XsNPnfEQ0v4VYjur0bFGkfFtJBF0mAiumlJoyzKYtD7ARaGDlGPaY11F6WJMJE98H1KEoPsdxbF00ovNfFrGl');
// const services = () => {
//     const handlePayment = async (amount) => {
//         try {
//           const response = await fetch('http://localhost:5000/create-payment-intent', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ amount }),
//           });
    
//           const { sessionId } = await response.json();
//           const stripe = await stripePromise;
    
//           const { error } = await stripe.redirectToCheckout({
//             sessionId, // Use the session ID returned from the backend
//           });
    
//           if (error) {
//             console.error('Stripe Checkout error:', error.message);
//             alert('Payment failed. Please try again.');
//           }
//         } catch (error) {
//           console.error('Payment error:', error);
//           alert('Payment failed. Please try again.');
//         }
//     };
//     return (
//         <div className='services'>
//             <div className='service'>
//                 <div className="service-header">Gold</div>
//                 <div className="service-body">
//                     <p>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
//                     faucibus interdum nunc.
//                     </p>
//                     <h3>Rp15.000</h3>
//                     <ul>
//                     <li>✔ Lorem ipsum dolor sit amet,</li>
//                     <li>✔ Lorem ipsum dolor sit amet,</li>
//                     <li>✔ Lorem ipsum dolor sit amet,</li>
//                     </ul>
//                 </div>
//                 <a href='/' onClick={() => handlePayment(15)}>
//                     <div className="caption" >
//                         <img src={basic_icon} alt="" />
//                         <p>Small PP</p>
//                     </div>
//                 </a>
//             </div>
//             <div className='service'>
//             <div className="service-header">Gold</div>
//                 <div className="service-body">
//                     <p>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
//                     faucibus interdum nunc.
//                     </p>
//                     <h3>Rp15.000</h3>
//                     <ul>
//                     <li>✔ Lorem ipsum dolor sit amet,</li>
//                     <li>✔ Lorem ipsum dolor sit amet,</li>
//                     <li>✔ Lorem ipsum dolor sit amet,</li>
//                     </ul>
//                 </div>
//                 <a href='/' onClick={() => handlePayment(25)}>
//                     <div className="caption" >
//                         <img src={advance_icon} alt="" />
//                         <p>Big D</p>
//                     </div>
//                 </a>
//             </div>
//             <div className='service'>
//             <div className="service-header">Gold</div>
//                 <div className="service-body">
//                     <p>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
//                     faucibus interdum nunc.
//                     </p>
//                     <h3>Rp15.000</h3>
//                     <ul>
//                     <li>✔ Lorem ipsum dolor sit amet,</li>
//                     <li>✔ Lorem ipsum dolor sit amet,</li>
//                     <li>✔ Lorem ipsum dolor sit amet,</li>
//                     </ul>
//                 </div>
//                 <a href='/' onClick={() => handlePayment(50)}>
//                     <div className="caption" >
//                         <img src={pro_icon} alt="" />
//                         <p>Jason Luv</p>
//                     </div>
//                 </a>
//             </div>
            
//         </div>
//     )
// }

// export default services
