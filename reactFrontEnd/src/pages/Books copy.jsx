import { useEffect, useState } from "react";
import axios from "axios";

//const axios = require('axios');


const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:4000/books");
        console.log(res)
        //setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  console.log(books);

}

export default Books