const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');


function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
}


router.post('/', verifyToken, async (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({
    title,
    content,
    author: req.user.id
  });

  try {
    await newPost.save();
    res.status(201).json({ message: 'Post creado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear post' });
  }
});


router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener posts' });
  }
});

module.exports = router;
