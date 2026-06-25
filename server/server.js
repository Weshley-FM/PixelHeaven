import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import db from './db.js';

const app = express();
const PORT = 5000;
const JWT_SECRET = 'pixel_heaven_super_secret_key_2026';

app.use(cors());
app.use(express.json());

// --- Authentication Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// --- AUTHENTICATION ROUTES ---

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    // In a real production app, use bcrypt.compare here
    if (user.password !== password) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '12h' });
    res.json({ token, user: { email: user.email } });
  });
});

// Get Current User (Verify token on frontend load)
app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});


// --- PROJECT ROUTES ---

// Get all projects (Public endpoint for the homepage)
app.get('/api/projects', (req, res) => {
  db.all('SELECT * FROM projects ORDER BY id ASC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows);
  });
});

// Create a project (Protected)
app.post('/api/projects', authenticateToken, (req, res) => {
  const { title, category, year, image } = req.body;
  if (!title || !category || !year || !image) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.run(
    'INSERT INTO projects (title, category, year, image) VALUES (?, ?, ?, ?)',
    [title, category, year, image],
    function(err) {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(201).json({ id: this.lastID, title, category, year, image });
    }
  );
});

// Update a project (Protected)
app.put('/api/projects/:id', authenticateToken, (req, res) => {
  const { title, category, year, image } = req.body;
  const { id } = req.params;

  db.run(
    'UPDATE projects SET title = ?, category = ?, year = ?, image = ? WHERE id = ?',
    [title, category, year, image, id],
    function(err) {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (this.changes === 0) return res.status(404).json({ error: 'Project not found' });
      res.json({ message: 'Project updated successfully' });
    }
  );
});

// Delete a project (Protected)
app.delete('/api/projects/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM projects WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (this.changes === 0) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
