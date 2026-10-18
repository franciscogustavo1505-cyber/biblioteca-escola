
import express from "express";
import { engine } from "express-handlebars";
import livroRoutes from "./routes/livros.js";

class App {
  constructor() {
    this.app = express();

    this.middlewares();
    this.views();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
  }

  views() {
    this.app.engine(
      "handlebars",
      engine({ defaultLayout: false })
    );

    this.app.set("view engine", "handlebars");
    this.app.set("views", "./src/views");
  }

  routes() {
    this.app.get("/", (req, res) => {
      res.redirect("/livros");
    });

    this.app.use("/livros", livroRoutes);
  }

  listen() {
    this.app.listen(3000, () => {
      console.log("Servidor rodando em http://localhost:3000");
    });
  }
}

const app = new App();
app.listen();
