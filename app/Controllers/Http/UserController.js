const User = use("App/Models/User");
// ctx é o contexto desta requisição
// desestruturamos ela pra termos o request e o response

class UserController {
  async store({ request }) {
    const data = request.only(["username", "email", "password"]);
    // buscamos nos campos o que a requição irá pedir para o usuário

    const user = await User.create(data); // criamos um novo usuário

    return user; // retornamos o usuário
    // automoticamente teremos um JSON deste usuário
  }
}

module.exports = UserController;
