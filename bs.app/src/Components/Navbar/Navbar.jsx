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
