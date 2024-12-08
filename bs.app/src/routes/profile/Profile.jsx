//import React from 'react';
import React, { useEffect, useState } from 'react';
import List from '../../Components/list/List';
import Map from '../../Components/map/Map';
import Bmicalc from '../../Components/Bmi/bmi';
import './Profile.scss';
function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/profile', {
          method: 'GET',
          credentials: 'include' // Include cookies to access the session
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);  // Set user data in state
        } else {
          setError("Failed to fetch user data. Please log in.");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;  // Show loading state while fetching data
  }

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
            <span>
              Username: <b>{userData.username}</b>
            </span>
            <span>
              E-mail: <b>{userData.email}</b>
            </span>
          </div>
          {/* <div class="bmiCircle">Fit</div> */}
          <div className="title">
            <h1>Laundry</h1>
            <button>Create New Post</button>
          </div>
          <Bmicalc/>
          <List />
          {/* <div className="title">
            <h1>Saved List</h1>
          </div>
          <List /> */}
        </div>
      </div>
      <div className="mapContainer">
        <Map/>
      </div>
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