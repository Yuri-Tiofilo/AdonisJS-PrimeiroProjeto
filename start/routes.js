const Route = use("Route");
// criando e logando usuário
Route.post("users", "UserController.store");
Route.post("sessions", "SessionController.store");
// resetando e enviando e-mail para usuário
Route.post("passwords", "ForgotPasswordController.store");
Route.put("passwords", "ForgotPasswordController.update");
// Upload de arquivos
Route.get("/files/:id", "FileController.show");
Route.post("/files", "FileController.store");
