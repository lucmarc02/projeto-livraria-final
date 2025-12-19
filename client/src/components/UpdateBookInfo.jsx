import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function UpdateBookInfo(props) {
  const [book, setBook] = useState({
    title: "",
    isbn: "",
    author: "",
    description: "",
    published_date: "",
    publisher: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/books/${id}`)
      .then((res) => {
        setBook({
          title: res.data.title,
          isbn: res.data.isbn,
          author: res.data.author,
          description: res.data.description,
          published_date: res.data.published_date,
          publisher: res.data.publisher,
        });
      })
      .catch((err) => {
        console.log("Error from UpdateBookInfo");
      });
  }, [id]);

  const onChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: book.title,
      isbn: book.isbn,
      author: book.author,
      description: book.description,
      published_date: book.published_date,
      publisher: book.publisher,
    };

    axios
      .put(`http://localhost:8082/api/books/${id}`, data)
      .then((res) => {
        navigate(`/show-book/${id}`);
      })
      .catch((err) => {
        console.log("Error in UpdateBookInfo!");
      });
  };

  return (
    <div className="update-book">
      
      <Link to="/" className="link-show-book-list">
        <button type="button" className="btn-show-book-list btn">
          Listar Livros
        </button>
      </Link>

      <div className="update-book-header">
        <h1 className="update-book-title">Editar Livro</h1>
        <p className="update-book-text">Atualizar Informações Livro</p>
      </div>

      <form className="form" noValidate onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            placeholder="Title of the Book"
            name="title"
            className="form-control"
            value={book.title}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="isbn">ISBN</label>
          <input
            type="text"
            placeholder="ISBN"
            name="isbn"
            className="form-control"
            value={book.isbn}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Autor</label>
          <input
            type="text"
            placeholder="Author"
            name="author"
            className="form-control"
            value={book.author}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            type="text"
            placeholder="Description of the Book"
            name="description"
            className="form-control"
            value={book.description}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="published_date">Data de Publicação</label>
          <input
            type="text"
            placeholder="Published Date"
            name="published_date"
            className="form-control"
            value={book.published_date}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="publisher">Publicação</label>
          <input
            type="text"
            placeholder="Publisher of the Book"
            name="publisher"
            className="form-control"
            value={book.publisher}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn-submit">
          Salvar Livro
        </button>
      </form>
    </div>
  );
}

export default UpdateBookInfo;
