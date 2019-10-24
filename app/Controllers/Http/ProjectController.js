const Project = use("App/Models/Project");

class ProjectController {
  // Listagem de todos os projetos -> Index
  async index({ request, response, view }) {
    const projects = await Project.query() // iniciar uma query
      .with("user") // carrega um relacionamento automatizamente preenchendo toda a informação do usuário
      .fetch(); // finaliza a query

    return projects;
  }

  // Criando de um projeto
  async store({ request, response, auth }) {
    // através do auth conseguimos pegar o id
    const data = request.only(["title", "description"]); // buscamos os campos para criação do projeto, e colocamos ele dentro de uma const

    const project = await Project.create({ ...data, user_id: auth.user.id }); // criamos um projeto por meio da const data com seus campos e colocamos dentro de uma outra const
    // junto de data colocamos user_id: auth para conseguirmos assim pegar todas as informações do usuário e junto seu id
    return project;
  }

  async show({ params }) {
    const project = await Project.findOrFail(params.id);

    await project.load("user"); // pega a informação de usuário igual o with do query
    await project.load("tasks"); // pega a informação de tarefas igual o with do query

    return project;
  }

  // atualiza uma nova informação
  async update({ params, request }) {
    const project = await Project.findOrFail(params.id);
    const data = request.only(["title", "description"]);

    project.merge(data); // coloca os dados da requisição dentro do objeto buscado

    await project.save(); // salva o novo estado do project

    return project; // retorna o novo project
  }

  // deleta os projetos -> destroy
  async destroy({ params }) {
    const project = await Project.findOrFail(params.id);

    await project.delete(); // deleta a informação do banco de dados
  }
}

module.exports = ProjectController;
