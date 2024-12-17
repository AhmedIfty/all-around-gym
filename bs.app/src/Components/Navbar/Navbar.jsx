// import React, { useState, useEffect } from 'react';
// import './Navbar.scss';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const [user, setUser] = useState(false); // Start with 'not logged in' state
//   const [scrolled, setScrolled] = useState(false);

//   const handleScroll = () => {
//     const offset = window.scrollY;
//     if (offset > 1) {
//       setScrolled(true);
//     } else {
//       setScrolled(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     // Check if the user is logged in by making an API call to the backend
//     const checkLoginStatus = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/checkLogin', {
//           method: 'GET',
//           credentials: 'include', // Include cookies to send session info
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setUser(data.loggedIn); // Backend should return { loggedIn: true/false }
//         } else {
//           setUser(false); // If the response is not OK, assume user is not logged in
//         }
//       } catch (error) {
//         console.error('Error checking login status:', error);
//         setUser(false); // On error, assume not logged in
//       }
//     };

//     checkLoginStatus();
//   }, []); // Empty dependency array to run only once on mount

//   return (
//     <nav className={scrolled ? 'scrolled' : ''}>
//         <div className='left'>
//             <Link to="/" className="logo">
//                 <img src="/logo.png" alt="" />
//                 <span>BS Services</span>
//             </Link>
//         </div>
//         <div className='right'>
//             {user ? (
//                 <div className='user'>
//                     <img
//                         src='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//                         alt='User Avatar'
//                     />
//                     <span>{user.username || 'User'}</span> {/* Use dynamic username if available */}
//                     <Link to="/profile" className='profile'>
//                         <span>Profile</span>
//                     </Link>
//                     <button
//                         onClick={async () => {
//                             // Logout API call (optional)
//                             await fetch('http://localhost:5000/logout', {
//                                 method: 'POST',
//                                 credentials: 'include',
//                             });
//                             setUser(false); // Clear the user state
//                         }}
//                         className="logoutButton"
//                     >
//                         Logout
//                     </button>
//                 </div>
//             ) : (
//                 <ul>
//                     <li><Link to="/login">Sign in</Link></li>
//                     <li><Link to="/register" className="register">Sign up</Link></li>
//                 </ul>
//             )}
//         </div>
//     </nav>
// );
// };

// export default Navbar;






import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const user = false;
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 1) {
        setScrolled(true);
        } else {
        setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={scrolled ? 'scrolled' : ''}>
            <div className='left'>
                <a href="/" className="logo">
                <img src="/logo.png" alt="" />
                <span>All around gym</span>
                </a>
            </div>
            <div className='right'>
                {user ? (
                    <div className='user'>
                        <img src='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='' />
                        <span>Alnf</span>
                        <Link to="/profile" className='profile'>
                            <span>Profile</span>
                        </Link>
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
