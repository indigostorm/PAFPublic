import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("https://render-rkgi.onrender.com/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  console.log(books);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://render-rkgi.onrender.com/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>VP Book Library</h1>
      <div className="books">
        {books.map((book) => (
          <div key={book.id} className="book">
            <img src={book.cover} alt="no cover available" />
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <p>{book.author}</p>
            
            <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
            <button className="update">
            
              <Link
                to={`/update/${book.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>
      <p></p>
      <p></p>
      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" , alignContent: "center"}}>
          Add Book
        </Link>
      </button>
    </div>
  );
};

export default Books;
