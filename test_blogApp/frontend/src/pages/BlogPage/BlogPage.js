import React, { useState, useEffect } from 'react';
import './BlogPage.css';
import axios from 'axios';

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://test_blogApp-backend.cloud-stacks.com/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    
    fetchPosts();
  }, []);

  const handleDeleteClick = (postId) => {
    setPostToDelete(postId);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://test_blogApp-backend.cloud-stacks.com/api/posts/${postToDelete}`);
      setPosts(posts.filter(post => post.id !== postToDelete));
      setPostToDelete(null);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="blog-page">
      <header className="header">
        <h1>Blog App</h1>
        <nav>
          <a href="#home">Home</a>
          <a href="#myposts">My Posts</a>
          <a href="#drafts">Drafts</a>
          <a href="#published">Published Posts</a>
          <a href="#settings">Settings</a>
        </nav>
      </header>
      <main className="main-content">
        {posts.map(post => (
          <div key={post.id} className="post">
            <h2>{post.title}</h2>
            <p>{post.datePublished}</p>
            <p>{post.excerpt}</p>
            <a href="#view">View Post</a>
            <a href="#edit">Edit Post</a>
            <button onClick={() => handleDeleteClick(post.id)}>Delete Post</button>
          </div>
        ))}
      </main>
      {postToDelete !== null && (
        <div className="confirm-delete">
          <p>Are you sure you want to delete this post?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={() => setPostToDelete(null)}>No</button>
        </div>
      )}
      <footer className="footer">
        <a href="#terms">Terms of Use</a>
        <a href="#privacy">Privacy Policy</a>
        <a href="#contact">Contact Us</a>
      </footer>
    </div>
  );
}

export default BlogPage;
