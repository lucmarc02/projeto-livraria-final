import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const BookCard = ({ books }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    setBookList(books);
  }, [books]);

  const onDeleteClick = (id) => {
    Swal.fire({
      title: "Você tem certeza?",
      text: "Essa ação não poderá ser revertida!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiUrl}/api/books/${id}`)
          .then(() => {
            setBookList(bookList.filter((book) => book._id !== id));
            Swal.fire("Deletado!", "O livro foi removido com sucesso.", "success");
          })
          .catch((err) => {
            console.log("Erro ao deletar livro", err);
            Swal.fire("Erro!", "Não foi possível deletar o livro.", "error");
          });
      }
    });
  };

  return (
    <table className="datatable">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Isbn</th>
          <th>Author</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookList.map((book, index) => (
          <tr key={book._id}>
            <td>{index + 1}</td>
            <td>{book.title}</td>
            <td>{book.isbn}</td>
            <td>{book.author}</td>
            <td>
              <Link to={`/show-book/${book._id}`}>
                <button type="button" className="btn-show-book btn">
                  Mostrar
                </button>
              </Link>

              <Link to={`/edit-book/${book._id}`}>
                <button type="button" className="btn-edit-book btn">
                  Editar Livro
                </button>
              </Link>

              <button
                className="btn-delete-book btn"
                onClick={() => onDeleteClick(book._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookCard;
