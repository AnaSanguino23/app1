import React, { useState } from 'react';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 
    try {
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({ title, content }),
      });
      const data = await res.json();
      setMessage(data.message || 'Publicación creada');
    } catch (err) {
      setMessage('Error al crear publicación');
    }
  };

  return (
    <div>
      <h2>Crear Publicación</h2>
      <form onSubmit={handleCreate}>
        <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Contenido" value={content} onChange={(e) => setContent(e.target.value)} />
        <button type="submit">Publicar</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default CreatePost;
