const Route = use("Route");
// criando e logando usuário
Route.post("users", "UserController.store").validator("User");
Route.post("sessions", "SessionController.store").validator("Session");
// resetando e enviando e-mail para usuário
Route.post("passwords", "ForgotPasswordController.store").validator(
  "ForgotPassword"
);
Route.put("passwords", "ForgotPasswordController.update").validator(
  "ResetPassword"
);

// Routas quando o usuário estiver logado
// Ele só tera acesso a estas rotas que estão dentro de group se
// caso ele estiver logado
Route.group(() => {
  // Upload de arquivos
  Route.get("/files/:id", "FileController.show");
  Route.post("/files", "FileController.store");
  // CRUD
  // Rota que pega todos os metodos de uma vez só, rota generica
  // apiOnly é uma forma de excluir os metodos edit e create
  Route.resource("projects", "ProjectController")
    .apiOnly()
    .validator(new Map([[["preject.store"], ["Project"]]]));
  // é necessario colocar projects.tasks pois ele já ira gerar uma rota de com projetos já incorporado aonde temos assim o id do projeto na rota que facilita na criação do CRUD nas rotas
  // utilizar sempre que um CRUD depender do outro
  Route.resource("projects.tasks", "TaskController")
    .apiOnly()
    .validator(new Map([[["projects.tasks.store"], ["Task"]]]));
}).middleware(["auth"]);
