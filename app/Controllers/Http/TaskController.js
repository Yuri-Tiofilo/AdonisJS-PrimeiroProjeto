const Task = use("App/Models/Task");

class TaskController {
  // Listagem de tarefas -> index
  async index({ params }) {
    const tasks = await Task.query()
      .where("project_id", params.projects_id) // onde tiver project_id
      .with("user") // pega as informações do usuário
      .fetch(); // fecha a query

    return tasks;
  }
  // criando tarefas -> store
  async store({ params, request }) {
    const data = request.only([
      // pega todas as informações que irá ser criada a tarefa
      "user_id",
      "title",
      "description",
      "due_date",
      "file_id"
    ]);
    const task = await Task.create({ ...data, project_id: params.projects_id }); // cria a tarefa

    return task; // retorna a tarefa
  }
  // mostra as tarefas'
  async show({ params }) {
    try {
      const task = await Task.findOrFail(params.id); // mostra a tarefa

      return task; // retorna a tarefa
    } catch (err) {
      .status(err.status)
      .send({ error: { message: "Algo deu errado" } });
    }
    const task = await Task.findOrFail(params.id); // mostra a tarefa

    return task; // retorna a tarefa
  }
  // Atualiza as informações de uma tarefa ->
  async update({ params, request }) {
    const task = await Task.findOrFail(params.id);
    const data = request.only([
      // pega os campos que serão modificados
      "user_id",
      "title",
      "description",
      "due_date",
      "file_id"
    ]);
    task.merge(data); // atualiza os dados
    await task.save(); // salva os novos dados da aplicação
    return task; // retorna o novo dado que foi atuzalido
  }

  // Deletar dados de tarefas -> Destroy
  async destroy({ params }) {
    const task = await Task.findOrFail(params.id); // pega os dados

    await task.delete(); // deletas os dados
  }
}

module.exports = TaskController;
