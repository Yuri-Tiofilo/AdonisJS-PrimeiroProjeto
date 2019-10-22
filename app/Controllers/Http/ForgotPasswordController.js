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
        mesagem => {
          message
            .to(user.email) // usuário que foi editado acima
            .from("yuri.silva@incca.com.br", "Yuri  |  INCCA Sistemas") // de quem o e-mail irá vim
            .subject("Recuperação de senha");
        }
      );
    } catch (err) {
      return response.status(err.status).send({
        error: { message: "algo não deu certo. Este e-mail existe?" }
      });
    }
  }
}

module.exports = ForgotPasswordController;
