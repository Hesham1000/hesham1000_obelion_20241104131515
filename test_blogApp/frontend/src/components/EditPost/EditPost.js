import React, { useState, useEffect } from 'react';
import './EditPost.css';
import axios from 'axios';

const EditPost = ({ postId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');
  const [originalContent, setOriginalContent] = useState('');

  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await axios.get(`https://test_blogApp-backend.cloud-stacks.com/api/posts/${postId}`);
        const post = response.data;
        setTitle(post.title);
        setContent(post.content);
        setOriginalTitle(post.title);
        setOriginalContent(post.content);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    loadPost();
  }, [postId]);

  const handleSaveChanges = async () => {
    try {
      await axios.put(`https://test_blogApp-backend.cloud-stacks.com/api/posts/${postId}`, {
        title,
        content
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Post updated successfully');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDiscardEdits = () => {
    setTitle(originalTitle);
    setContent(originalContent);
  };

  return (
    <div className="edit-post-container">
      <header className="header">
        <h1>Blog Title</h1>
        <div className="user-profile">User Profile</div>
      </header>
      <nav className="navigation-tabs">
        <ul>
          <li>Home</li>
          <li>My Posts</li>
          <li>Drafts</li>
        </ul>
      </nav>
      <main className="main-content">
        <form className="edit-post-form">
          <div className="form-field">
            <label htmlFor="post-title">Title</label>
            <input
              id="post-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="post-content">Content</label>
            <textarea
              id="post-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="action-buttons">
            <button type="button" onClick={handleSaveChanges}>
              Save Changes
            </button>
            <button type="button" onClick={handleDiscardEdits}>
              Discard Edits
            </button>
          </div>
        </form>
      </main>
      <footer className="footer">
        <span>© 2023 Blog Platform</span>
        <a href="/terms">Terms of Service</a>
        <a href="/privacy">Privacy Policy</a>
      </footer>
    </div>
  );
};

export default EditPost;
