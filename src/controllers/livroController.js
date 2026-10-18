
class Livro {
  static codigoGeral = 0;

  constructor(titulo, autor, ano, exemplares) {
    this.codigo = ++Livro.codigoGeral;
    this.titulo = titulo;
    this.autor = autor;
    this.ano = Number(ano);
    this.exemplares = Number(exemplares);
    this.emprestados = 0;
  }
}

const livros = [];

class LivroController {
  index(req, res) {
    const lista = livros.map((l) => {
      const disponiveis = l.exemplares - l.emprestados;

      return {
        ...l,
        disponiveis,
        disponivel: disponiveis > 0,
        situacao:
          disponiveis > 0
            ? "Disponível"
            : "Todos emprestados",
      };
    });

    const totalExemplares = livros.reduce(
      (soma, livro) => soma + livro.exemplares,
      0
    );

    return res.render("livros", {
      livros: lista,
      total: livros.length,
      totalExemplares,
    });
  }

  store(req, res) {
    const { titulo, autor, ano, exemplares } = req.body;

    livros.push(new Livro(titulo, autor, ano, exemplares));

    return res.redirect("/livros");
  }
}

export default new LivroController();
