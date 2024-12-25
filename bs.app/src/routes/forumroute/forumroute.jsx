import React from 'react';
import Forum from '../../Components/forum/forum';
import './forumroute.scss';

const ForumRoute = () => {
    return (
        <div className="forum-layout">
            <div className="sidebar">
                <h2>Categories</h2>
                <ul>
                    <li>Workouts</li>
                    <li>Nutrition</li>
                    <li>Gym</li>
                    <li>General Discussions</li>
                </ul>
            </div>
            <div className="main-content">
                <Forum />
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
