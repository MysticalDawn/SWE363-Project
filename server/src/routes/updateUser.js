import express from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../model/UserMdle.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  let userId;
  try {
    const decoded = jwt.verify(token, 'secret'); // Use your JWT secret here
    userId = decoded.id;
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  try {
    const { name, email, major, city, phone } = req.body;
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      { name, email, major, city, phone },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

export { router as UpdateUserRouter };
