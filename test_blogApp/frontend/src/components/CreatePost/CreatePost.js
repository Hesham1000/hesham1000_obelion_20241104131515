import React, { useState } from 'react';
import './CreatePost.css';
import axios from 'axios';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);

  const handleFileChange = (e) => {
    setMedia(e.target.files[0]);
  };

  const handleSaveDraft = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('media', media);
      formData.append('status', 'draft');

      const response = await axios.post('https://test_blogApp-backend.cloud-stacks.com/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Draft Saved:', response.data);
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };

  const handlePublish = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('media', media);
      formData.append('status', 'published');

      const response = await axios.post('https://test_blogApp-backend.cloud-stacks.com/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Post Published:', response.data);
    } catch (error) {
      console.error('Error publishing post:', error);
    }
  };

  return (
    <div className="create-post">
      <header className="header">
        <div className="logo">Blog Logo</div>
        <div className="title-description">
          <h1>Blog Title</h1>
          <p>Blog Description</p>
        </div>
        <div className="user-profile">
          <button>Profile</button>
          <button>Logout</button>
        </div>
      </header>
      <nav className="navigation">
        <ul>
          <li>Home</li>
          <li>My Posts</li>
          <li>Create Post</li>
          <li>Settings</li>
        </ul>
      </nav>
      <main className="main-content">
        <form className="post-form">
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Blog Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <input type="file" onChange={handleFileChange} />
          <div className="action-buttons">
            <button type="button" onClick={handleSaveDraft}>Save as Draft</button>
            <button type="button" onClick={handlePublish}>Publish Post</button>
          </div>
        </form>
      </main>
      <footer className="footer">
        <ul>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
        </ul>
        <div className="social-media">
          <span>Social Icons</span>
        </div>
      </footer>
    </div>
  );
}

export default CreatePost;
