import React, { useState, useEffect } from 'react';
import "./profileUpdate.scss";

function ProfileUpdatePage() {
  const [userData, setUserData] = useState({ username: '', email: '' });
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/profileUpdate', {
          method: 'GET',
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setUserData({ username: data.username, email: data.email });
        } else {
          setErrorMessage('Failed to fetch user data. Please log in.');
        }
      } catch (err) {
        setErrorMessage('Something went wrong. Please try again.');
      }
    };

    fetchUserData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/profileUpdate', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include session cookies
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: password || undefined, // Only send password if it's updated
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Profile updated successfully!');
      } else {
        setErrorMessage(data.message || 'Failed to update profile.');
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>

          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}

          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={userData.username}
              onChange={(e) =>
                setUserData((prevData) => ({ ...prevData, username: e.target.value }))
              }
              required
            />
          </div>

          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData((prevData) => ({ ...prevData, email: e.target.value }))
              }
              required
            />
          </div>

          <div className="item">
            <label htmlFor="password">New Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img
          src="https://via.placeholder.com/150"
          alt="Avatar"
          className="avatar"
        />
      </div>
    </div>
  );
  }
  
  export default ProfileUpdatePage;  





//   return (
//     <div className="profileUpdatePage">
//       <div className="formContainer">
//         <form>
//           <h1>Update Profile</h1>

//           {errorMessage && <p className="error">{errorMessage}</p>}         
//           {successMessage && <p className="success">{successMessage}</p>}  

//           <div className="item">
//             <label htmlFor="username">Username</label>
//             <input
//               id="username"
//               name="username"
//               type="text"
//             />
//           </div>
//           <div className="item">
//             <label htmlFor="email">Email</label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//             />
//           </div>
//           <div className="item">
//             <label htmlFor="password">Password</label>
//             <input id="password" name="password" type="password" />
//           </div>
//           <button>Update</button>
//         </form>
//       </div>
//       <div className="sideContainer">
//         <img src="" alt="" className="avatar" />
//       </div>
//     </div>
//   );
// }









  