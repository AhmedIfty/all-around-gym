import React, { useState } from 'react';
import Forum from '../../Components/forum/forum';
import './forumroute.scss';

const ForumRoute = () => {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="forum-layout">
            <div className="sidebar">
                <h2>Categories</h2>
                <ul>
                    <li onClick={() => handleCategoryClick('')}>All</li>
                    <li onClick={() => handleCategoryClick('Workouts')}>Workouts</li>
                    <li onClick={() => handleCategoryClick('Nutrition')}>Nutrition</li>
                    <li onClick={() => handleCategoryClick('Gym')}>Gym</li>
    
                </ul>
            </div>
            <div className="main-content">
                <Forum selectedCategory={selectedCategory} />
            </div>
            <div className="sidebar">
                <h2>Popular Posts</h2>
                <ul>
                    <li>..</li>
                    <li>..</li>
                    <li>..</li>
                    <li>..</li>
                </ul>
            </div>
        </div>
    );
};

export default ForumRoute;