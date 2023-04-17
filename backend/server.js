import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import ConnectDB from './config/db.js';
import User from './models/userModel.js';
import Message from './models/messageModel.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
dotenv.config();
ConnectDB();
let refreshTokens = [];

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: '5s',
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_KEY);
};

const addNewUser = (user) => {};
const addNewMessage = (message) => {};

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
      if (err) {
        return res.status(403).json('Token is not valid!');
      }

      req.id = user.id;
      next();
    });
  } else {
    res.status(401).json('You are not authenticated!');
  }
};

app.post('/api/refresh', (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.status(401).json('You are not authenticated!');
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json('Refresh token is not valid!');
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
    if (err) {
      return res.status(403).json('Token is not valid!');
    }
    const newAccessToken = generateAccessToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);
    refreshTokens.push(newRefreshToken);
    let index = refreshTokens.indexOf(refreshToken);
    if (index !== -1) {
      refreshTokens.splice(index, 1);
    }
    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
});

app.post('/api/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).json('User Not Found');
  } else {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const refreshToken = generateRefreshToken(user._id);
      refreshTokens.push(refreshToken);
      res.status(200).json({
        name: user.name,
        accessToken: generateAccessToken(user._id),
        refreshToken,
      });
    }
  }
});

app.post('/api/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    ...req.body,
    password: hashedPassword,
  });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  refreshTokens.push(refreshToken);
  res.status(200).json({ accessToken, refreshToken, name: user.name });
});

app.get('/api/users', verify, async (req, res) => {
  const users = await User.find({ _id: { $ne: req.id } }).select('name _id');
  res.status(200).json(users);
});

app.post('/api/messages', verify, async (req, res) => {
  const messages = await Message.find({
    $or: [
      { sender: req.id, receiver: req.body.id },
      { sender: req.body.id, receiver: req.id },
    ],
  });
  res.status(200).json(messages);
});

app.post('/api/message', verify, async (req, res) => {
  console.log(req.body);
  const message = await Message.create({
    text: req.body.text,
    sender: req.id,
    receiver: req.body.receiver,
  });
  res.json('Success');
});

app.listen(5000);
