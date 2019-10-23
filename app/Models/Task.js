const Model = use("Model");

class Task extends Model {
  project() {
    return this.belongsTo("App/Models/Project"); // uma tarefa é relacionada com apenas um projeto
  }
  user() {
    return this.belongsTo("App/Models/Users"); // um usuário apenas pega um relacionamento
  }
  file() {
    return this.belongsTo("App/Models/File"); // um arquivo apenas é relacionado com uma tarefa
    // para termos mais de um arquivo dentro de uma tarefa é necessario ter uma tabela pivo
    // que assim transformaria belongsTo => belongsToMany
  }
}

module.exports = Task;
