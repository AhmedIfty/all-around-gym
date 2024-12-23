import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleSuccess = async () => {
      try {
        const response = await fetch('http://localhost:5000/payment-success', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include session cookies
          body: JSON.stringify({
            planType: localStorage.getItem('selectedPlanType'), // Retrieve the stored planType
          }),
        });

        if (response.ok) {
          navigate('/'); // Redirect to homepage after success
        } else {
          console.error('Failed to update plan type');
        }
      } catch (error) {
        console.error('Error handling success:', error);
      }
    };

    handleSuccess();
  }, [navigate]);

  return <div>Processing your payment...</div>;
};

export default Success;


// import React from 'react'

// const SuccessPage = () => {
//     return (
//       <div>
//         <h1>Payment Successful!</h1>
//         <p>Your membership will be updated shortly. Thank you!</p>
//       </div>
//     );
//   };
  
//   export default SuccessPage;