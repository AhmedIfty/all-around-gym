import React, { useState, useEffect } from 'react';
import Forum from '../../Components/forum/forum';
import axios from 'axios';
import './forumroute.scss';

const ForumRoute = () => {
    const [selectedCategory, setSelectedCategory] = useState('Workouts'); // Default category set to "Workouts"
    const [popularPosts, setPopularPosts] = useState([]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    useEffect(() => {
        const fetchPopularPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/forum', { withCredentials: true });
                const sortedPosts = response.data.sort((a, b) => b.likes - a.likes);
                setPopularPosts(sortedPosts.slice(0, 5)); // Get top 5 most liked posts
            } catch (error) {
                console.error('Error fetching popular posts:', error);
            }
        };

        fetchPopularPosts();
    }, []);

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
            <div className="sidebar2">
                <h2>Popular Posts</h2>
                <ul>
                    {popularPosts.map((post, index) => (
                        <li key={index}>
                            <p>{post.content}</p>
                            <span>Likes: {post.likes}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ForumRoute;