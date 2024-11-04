import React, { useState, useEffect } from 'react';
import './DeletePost.css';
import axios from 'axios';

function DeletePost({ onDelete }) {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);

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
    setSelectedPostId(postId);
  };

  const confirmDeletion = async () => {
    if (selectedPostId !== null) {
      try {
        await axios.delete(`https://test_blogApp-backend.cloud-stacks.com/api/posts/${selectedPostId}`);
        onDelete(selectedPostId);
        setPosts(posts.filter(post => post.id !== selectedPostId));
        setSelectedPostId(null);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const cancelDeletion = () => {
    setSelectedPostId(null);
  };

  return (
    <div className="delete-post">
      <header className="header">
        <h1>Blog App</h1>
        <nav className="navigation-tabs">
          <a href="/">Home</a>
          <a href="/my-posts">My Posts</a>
          <a href="/drafts">Drafts</a>
          <a href="/published">Published Posts</a>
          <a href="/settings">Settings</a>
        </nav>
      </header>
      <main className="main-content">
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <h2>{post.title}</h2>
            <p>{post.datePublished}</p>
            <p>{post.excerpt}</p>
            <div className="post-actions">
              <a href={`/view/${post.id}`}>View Post</a>
              <a href={`/edit/${post.id}`}>Edit Post</a>
              <button onClick={() => handleDeleteClick(post.id)}>Delete Post</button>
            </div>
          </div>
        ))}
      </main>
      {selectedPostId !== null && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete this post?</p>
          <button onClick={confirmDeletion}>Yes</button>
          <button onClick={cancelDeletion}>No</button>
        </div>
      )}
      <footer className="footer">
        <a href="/terms">Terms of Use</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/contact">Contact Us</a>
        <div className="social-media-icons">
          <a href="https://facebook.com">Facebook</a>
          <a href="https://twitter.com">Twitter</a>
          <a href="https://instagram.com">Instagram</a>
        </div>
      </footer>
    </div>
  );
}

export default DeletePost;
