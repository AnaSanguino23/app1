import React, { useEffect, useState } from 'react';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/posts');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('Error al obtener publicaciones', err);
      }
    };

    getPosts();
  }, []);

  return (
    <div>
      <h2>Publicaciones</h2>
      {posts.length === 0 ? (
        <p>No hay publicaciones</p>
      ) : (
        posts.map((post) => (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;
