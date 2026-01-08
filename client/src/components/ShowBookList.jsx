import { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";

function ShowBookList() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/books`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log("Error from ShowBookList");
      });
  }, []);

  const bookList =
    books.length === 0
      ? "there is no book record!"
      : <BookCard books={books} />;


  return (
    <div className="ShowBookList">
								 
							 
									 
				  
       <h2 className="book-list-header">Lista de Livros</h2>

      <Link to="/create-book" className="link-create-book">
        <button type="button" className="btn-create-book btn">
							   
															 
			 
          Adicionar Livro
        </button>
				  
				  
				  
      </Link>
      
      <div className="list">{bookList}</div>
			
    </div>
  );
}

export default ShowBookList;
