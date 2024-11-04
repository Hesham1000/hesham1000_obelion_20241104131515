import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BlogPage.css';

function BlogPage({ match }) {
  const postId = match.params.id;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://test_blogApp-backend.cloud-stacks.com/api/posts/${postId}`);
        setTitle(response.data.title);
        setContent(response.data.content);
        setOriginalTitle(response.data.title);
        setOriginalContent(response.data.content);
      } catch (err) {
        setError('Failed to fetch post');
      }
    };
    fetchPost();
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
      setOriginalTitle(title);
      setOriginalContent(content);
    } catch (err) {
      setError('Failed to save changes');
    }
  };

  const handleDiscardEdits = () => {
    setTitle(originalTitle);
    setContent(originalContent);
  };

  return (
    <div className="blog-page">
      <header className="header">
        <h1>Blog Platform Name</h1>
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
        {error && <div className="error-message">{error}</div>}
        <form className="edit-form">
          <div className="form-field">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
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
        <div>© 2023 Blog Platform. All rights reserved.</div>
        <div>
          <a href="#terms">Terms of Service</a> | <a href="#privacy">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}

export default BlogPage;
