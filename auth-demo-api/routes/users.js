import express from 'express';
import bcrypt from 'bcrypt';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;


const prisma = new PrismaClient();
const router = express.Router();

// Route for user registration
router.post('/users', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if username or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email
      }
    });

    // Set the user in the session
    // req.session.user = newUser;
    req.session.user = { id: newUser.id, username: newUser.username };

    // Return the user data in the response
    res.json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route for user login
router.post('/users/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Set the user in the session
    // req.session.user = user;
    req.session.user = { id: user.id, username: user.username };


    // Return the user data in the response
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});




router.post('/users/logout', (req, res) => {
  // Clear the session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to logout' });
    }

    // Clear the cookie
    res.clearCookie('connect.sid'); // Replace 'connect.sid' with your cookie name

    // Send a success response
    res.status(200).json({ message: 'Logged out successfully' });
  });
});


export default router;
