import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './forum.scss';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/forum',{ withCredentials: true });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching forum posts:', error);
      }
    };

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profile',{ withCredentials: true });
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchPosts();
    fetchUserProfile();
  }, []);

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/forum', { 
        username: username,
        content: newPost 
      });
      setPosts([response.data, ...posts]);
      setNewPost('');
    } catch (error) {
      console.error('Error posting new message:', error);
    }
  };

  return (
    <div className="forum-page">
      <h1>Fitness Forum</h1>
      <form onSubmit={handlePostSubmit} className="new-post-form">
        <textarea
          value={newPost}
          onChange={handlePostChange}
          placeholder="Share your fitness tips and experiences..."
        />
        <button type="submit">Post</button>
      </form>
      <div className="posts">
        {posts.map((post, index) => (
          <div key={index} className="post">
            <p>{post.content}</p>
            <span>Posted by {post.username} on {new Date(post.createdAt).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;