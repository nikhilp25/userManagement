const express = require('express');
const app = express();
app.use(express.json());

// Dummy user data (replace with a database or storage solution)
let users = [];

// Endpoint to create a new user
app.post('/users', (req, res) => {
  const { name, email, password } = req.body;

  // Validate request data
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  // Check if the user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(409).json({ error: 'User already exists' });
  }

  // Create a new user object
  const newUser = { name, email, password };

  // Save the user to the database or storage solution
  users.push(newUser);

  return res.status(201).json({ message: 'User created successfully', user: newUser });
});

app.get('/users', (req, res) => {
  return res.json({ users }); 
});


// Start the server
app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

