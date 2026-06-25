import db from './db.js';

const initialProjects = [
  {
    title: 'Neon Genesis',
    category: 'E-Commerce',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'Aura Protocol',
    category: 'Web3 Platform',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'Lumina',
    category: 'Dashboard',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'Vanguard',
    category: 'Editorial',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'Atlas',
    category: 'Mobile App',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop'
  }
];

// We will use plain text passwords for this minimal MVP backend so users cloning the repo don't need bcrypt compiled.
// For production, ALWAYS use bcrypt or argon2.
const adminUser = {
  email: 'admin@pixelheaven.com',
  password: 'password123'
};

console.log('Seeding database...');

db.serialize(() => {
  // Clear existing tables
  db.run('DELETE FROM users');
  db.run('DELETE FROM projects');

  // Insert Admin User
  db.run(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [adminUser.email, adminUser.password],
    function(err) {
      if (err) console.error('Error inserting admin user:', err.message);
      else console.log('Admin user seeded.');
    }
  );

  // Insert Projects
  const stmt = db.prepare('INSERT INTO projects (title, category, year, image) VALUES (?, ?, ?, ?)');
  initialProjects.forEach((p) => {
    stmt.run(p.title, p.category, p.year, p.image);
  });
  stmt.finalize((err) => {
    if (err) console.error('Error finalizing projects statement:', err.message);
    else console.log('Projects seeded successfully.');
    
    // Close the DB connection after seeding
    db.close((err) => {
      if (err) console.error('Error closing database:', err.message);
      else console.log('Database connection closed.');
    });
  });
});
