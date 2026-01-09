import { RiCloseLargeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";

function Menu({ toggleSidebar }) {
  return (
    <div className="menu">
      <span className="menu-btn" onClick={toggleSidebar}>
        <RiCloseLargeFill />
      </span>

      <nav>
        <Link to="">
          {" "}
          <img
            src="./images/logolivraria.png"
            alt="logo"
            className="logolivraria-icon"
          />
        </Link>
      </nav>

      <nav>
        <li>
          <Link to="/">
            <FaBook /> Listar livros
          </Link>
        </li>
        <li>
          <Link to="/create-book">
            <MdLibraryBooks /> Adcionar Livro
          </Link>
        </li>
      </nav>
    </div>
  );
}

export default Menu;
