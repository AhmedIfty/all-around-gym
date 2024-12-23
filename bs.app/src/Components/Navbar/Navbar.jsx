import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../../Components/search/searchBar';
import axios from 'axios';

const Navbar = () => {
    const [user, setUser] = useState(null); // To store logged-in user details
    const [scrolled, setScrolled] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
    const navigate = useNavigate();

    // Handle scroll effect for Navbar
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 1) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    // Check login status on component mount
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('http://localhost:5000/profile', {
                    withCredentials: true, // Allow credentials to be sent with the request
                });
                if (response.status === 200) {
                    setUser(response.data); // Set user data if logged in
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setUser(null); // No user logged in
            }
        };

        checkLoginStatus();

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSearch = (searchTerm) => {
        console.log('Search term:', searchTerm);
    };

    // Handle logout functionality
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
            setUser(null); // Reset user state
            navigate('/'); // Redirect to home page
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <nav className={scrolled ? 'scrolled' : ''}>
            <div className='left'>
                <a href="/" className="logo">
                    <img src="/logo.png" alt="" />
                    <span>BS Services</span>
                </a>
                {/* <div>
                  <SearchBar onSearch={handleSearch} />
                </div> */}
                
            </div>
            <div className='gymlist'><a href='/list'>Gym List</a></div>
            <div className='right'>
            
                {user ? (
                    <div
                        className='user'
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                    >   
                        <img
                            src={
                                user.avatar ||
                                'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                            }
                            alt='User Avatar'
                        />
                        <span>{user.username}</span>
                        <Link to="/profile" className="profile">
                            Profile
                        </Link>
                        {showDropdown && (
                            <div className='dropdown'>
                                <div className='dropdown-item' onClick={handleLogout}>
                                    → Logout
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <ul>
                        <li><a href='/login'>Sign in</a></li>
                        <li><a href='/register' className="register">Sign up</a></li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
