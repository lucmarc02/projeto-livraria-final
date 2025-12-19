const express = require("express");

const router = express.Router();

//Carregar o Book Model
const Book = require("../../models/Book");

//Get api/books/test
router.get("/test", (req, res) => res.send("Testando rotas de livros"));

//Get api/books
//Pegar todos os livros
router.get("/", (req, res) => {
  Book.find()
    .then((books) => res.json(books))
    .catch((err) =>
      res.status(404).json({ nobooksfound: "Nenhum livro encontrado" })
    );
});

//GET api/books/:id
//Pegar um único livro por id
router.get("/:id", (req, res) => {
  Book.findById(req.params.id)
    .then((book) => res.json(book))
    .catch((err) =>
      res.status(404).json({ nobooksfound: "Nenhum livro encontrado" })
    );
});

//Post api/books
//Adicionar / salvar livro
router.post("/", (req, res) => {
  Book.create(req.body)
    .then((book) => res.json({ msg: "Livro adicionado com sucesso" }))
    .catch((err) =>
      res.status(400).json({ error: "Não foi possível adicionar este livro" })
    );
});

//PUT api/books/:id
//Atualizar livro
router.put("/:id", (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then((book) => res.json({ msg: "Atualizado com sucessso." }))
    .catch((err) =>
      res
        .status(400)
        .json({ error: "Não foi possível atualizar a base de dados." })
    );
});

//DELETE api/books/:id
// Deletar livro por id
router.delete("/:id", (req, res) => {
  Book.findByIdAndDelete(req.params.id, req.body)
    .then((book) => res.json({ msg: "Livro deletado com sucessso." }))
    .catch((err) => res.status(400).json({ error: "Não existe este livro." }));
});

module.exports = router;
