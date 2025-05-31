import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import CreatePost from './CreatePost';
import PostList from './PostList';
import './App.css'; 

function App() {
  return (
    <Router>
      <nav>
        <Link to="/register">Registro</Link> |{" "}
        <Link to="/login">Iniciar Sesión</Link> |{" "}
        <Link to="/create-post">Crear Publicación</Link> |{" "}
        <Link to="/posts">Ver Publicaciones</Link>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts" element={<PostList />} />
      </Routes>
    </Router>
  );
}

export default App;
