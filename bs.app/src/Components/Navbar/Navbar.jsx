import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [user, setUser] = useState(null); // Store logged-in user details
  const [scrolled, setScrolled] = useState(false); // Track scrolling for styling
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown visibility
  const [notification, setNotification] = useState(false); // Notification for workouts
  const navigate = useNavigate();

  // Handle scroll effect for Navbar
  const handleScroll = () => {
    const offset = window.scrollY;
    setScrolled(offset > 1);
  };

  // Fetch user and workout data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profile', {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUser(response.data);
          checkUpcomingWorkouts(response.data.workoutTimes);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const checkUpcomingWorkouts = (workoutTimes) => {
      const now = new Date();
      const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

      const hasUpcomingWorkout = workoutTimes?.some(workout => {
        const workoutTime = new Date(workout.time);
        return workoutTime > now && workoutTime <= twoHoursLater;
      });

      setNotification(hasUpcomingWorkout);
    };

    fetchUser();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      setUser(null);
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="Logo" />
          <span>BS Services</span>
        </a>
      </div>

      <div className="right">
        {user ? (
          <div className="user-container">
            <div className="gymlist">
              <a href="/list">Gym List</a>
            </div>
            <div className="forum">
              <a href="/forumroute">Forum</a>
            </div>
            <div className="search">
              <Link to="/searchtest">Search</Link>
            </div>
            <div
              className="user"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <img
                src={
                  user.avatar ||
                  'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                }
                alt="User Avatar"
              />
              <span>{user.username}</span>

              {showDropdown && (
                <div className="dropdown">
                  <div className="dropdown-item" onClick={handleLogout}>
                    → Logout
                  </div>
                </div>
              )}
            </div>
            <Link to="/profile" className="profile">
              Profile {notification && <span className="notification">!</span>}
            </Link>
          </div>
        ) : (
          <ul>
            <li>
              <a href="/login">Sign in</a>
            </li>
            <li>
              <a href="/register" className="register">
                Sign up
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
