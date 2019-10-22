// auth é totalmente para a autenticação
// está é uma autenticação em JWT
// Explicação: Pegamos o email e password que o usuário insere
// Com isso enviamos um token

class SessionController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

    return token
  }
}

module.exports = SessionController
