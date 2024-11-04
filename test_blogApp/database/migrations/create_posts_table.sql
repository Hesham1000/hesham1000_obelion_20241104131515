CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  media VARCHAR(255),
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft'
);
