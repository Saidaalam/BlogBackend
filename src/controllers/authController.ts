import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';

// Register a user
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: 'User already exists' });
      return;
    }

    // Hash the password from request body
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Respond with success and user data
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      statusCode: 201,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Login a user
export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        statusCode: 401,
        error: { details: 'User not found' },
        stack: 'User with provided email does not exist',
      });
      return;
    }

    // Compare the hashed password with the entered password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        statusCode: 401,
        error: { details: 'Password does not match' },
        stack: 'Invalid password',
      });
      return;
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET as string, {
      expiresIn: '5d',
    });

    // Send response with success status
    res.status(200).json({
      success: true,
      message: 'Login successful',
      statusCode: 200,
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};
