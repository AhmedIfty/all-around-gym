//import React from 'react';
import React, { useEffect, useState } from 'react';
import List from '../../Components/list/List';
import Map from '../../Components/map/Map';
import Bmicalc from '../../Components/Bmi/bmi';
import Modal from '../../Components/Modal/modal';
import './Profile.scss';
function ProfilePage() {
  // const [userData, setUserData] = useState(null);
  // const [error, setError] = useState("");

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5000/profile', {
  //         method: 'GET',
  //         credentials: 'include' // Include cookies to access the session
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         setUserData(data);  // Set user data in state
  //       } else {
  //         setError("Failed to fetch user data. Please log in.");
  //       }
  //     } catch (err) {
  //       setError("Something went wrong. Please try again.");
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  // if (error) {
  //   return <div>{error}</div>;
  // }

  // if (!userData) {
  //   return <div>Loading...</div>;  // Show loading state while fetching data
  // }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateNewPostClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (formData) => {
    // Handle the form data (e.g., send it to the backend or update state)
    console.log('Form Submitted', formData);
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button><a href="/ProfileUpdatePage">Update Profile</a></button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
            </span>
            {/* <span>
              Username: <b>{userData.username}</b>
            </span>
            <span>
              E-mail: <b>{userData.email}</b>
            </span> */}
          </div>
          <Bmicalc />
          <div className="title">
            <h1>Workouts</h1>
            <button onClick={handleCreateNewPostClick}>Add New Workout</button>
          </div>
          <List />
        </div>
      </div>
      <div className="mapContainer">
        <Map />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default ProfilePage;










// const Profile = () => {
//   return (
//     <div className='pri'>Profile</div>
//   )
// }

// export default Profile