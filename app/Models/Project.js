const Model = use("Model");

class Project extends Model {
  user() {
    // cria um metodo com o nome do relacionamento que irá ser feito
    return this.belongsTo("App/Models/User"); // o projeto pertece a um usuário
  }
  tasks() {
    return this.hasMany("App/Models/Task"); // um projeto pode ter varias tarefas associada a ele.
  }
}

module.exports = Project;
