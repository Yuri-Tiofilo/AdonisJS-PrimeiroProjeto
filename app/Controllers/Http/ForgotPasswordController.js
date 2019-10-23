const moment = require("moment");
const crypto = require("crypto");
const User = use("App/Models/User");
const Mail = use("Mail");

class ForgotPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input("email");
      const user = await User.findByOrFail("email", email);
      // findBy é utilizado para encontrar apenas um requistro,
      // utilizaremos do e-mail para encontrar este tipo de informação
      // OrFail é para caso ele não encontre retorne um erro caindo no cacth

      user.token = crypto.randomBytes(10).toString("hex");
      // a função crypto é utilizada para gerar novo token, aqui estamos utilizando de 10 numeros que serão convertidos para hexadecimal
      user.token_create_at = new Date();
      await user.save();
      //envio de email

      await Mail.send(
        ["emails.forgot_password"],
        {
          email,
          token: user.token,
          link: `${request.input("redirect_url")}?token=${user.token}`
        },
        message => {
          message
            .to(user.email)
            .from("yuri@gmail.com")
            .subject("Recuperação de senha");
        }
      );
    } catch (err) {
      return response.status(err.status).send({
        error: { message: "algo não deu certo. Este e-mail existe?" }
      });
    }
  }
  async update({ request, response }) {
    try {
      const { token, password } = request.all();

      const user = await User.findByOrFail("token", token);

      const tokenExpired = moment()
        .subtract("2", "days")
        .isAfter(user.token_create_at);
      if (tokenExpired) {
        return response
          .status(401)
          .send({ error: { message: "token expirado" } });
      }
      user.token = null;
      user.token_create_at = null;
      user.password = password;

      await user.save();
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "Algo deu errado ao resetar sua senha" } });
    }
  }
}

module.exports = ForgotPasswordController;
