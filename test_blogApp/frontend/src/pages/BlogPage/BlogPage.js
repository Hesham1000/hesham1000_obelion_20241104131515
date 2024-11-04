import React, { useState } from 'react';
import axios from 'axios';
import './BlogPage.css';

function BlogPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleMediaChange = (e) => setMedia(e.target.files[0]);

  const saveDraft = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (media) formData.append('media', media);
      formData.append('status', 'draft');

      await axios.post('https://test_blogApp-backend.cloud-stacks.com/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Draft saved successfully');
    } catch (error) {
      alert('Failed to save draft');
    }
  };

  const publishPost = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (media) formData.append('media', media);
      formData.append('status', 'published');

      await axios.post('https://test_blogApp-backend.cloud-stacks.com/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Post published successfully');
    } catch (error) {
      alert('Failed to publish post');
    }
  };

  return (
    <div className="blog-page">
      <header className="header">
        <div className="logo">Logo</div>
        <div className="blog-title">Blog Title</div>
        <div className="blog-description">A brief description of the blog.</div>
        <div className="profile-actions">
          <button>Profile</button>
          <button>Logout</button>
        </div>
      </header>
      <nav className="nav-tabs">
        <button>Home</button>
        <button>My Posts</button>
        <button>Create Post</button>
        <button>Settings</button>
      </nav>
      <main className="form-container">
        <input
          type="text"
          placeholder="Enter blog title"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          placeholder="Enter blog content"
          value={content}
          onChange={handleContentChange}
        ></textarea>
        <input type="file" onChange={handleMediaChange} />
        <div className="action-buttons">
          <button onClick={saveDraft}>Save as Draft</button>
          <button onClick={publishPost} className="publish-button">Publish Post</button>
        </div>
      </main>
      <footer className="footer">
        <a href="#about">About Us</a>
        <a href="#contact">Contact Us</a>
        <a href="#terms">Terms of Service</a>
        <a href="#privacy">Privacy Policy</a>
        <div className="social-media-icons">
          {/* Social media icons can be added here */}
        </div>
      </footer>
    </div>
  );
}

export default BlogPage;
