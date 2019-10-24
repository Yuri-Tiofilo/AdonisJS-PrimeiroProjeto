"use strict";

class User {
  get validateAll() {
    return true;
  }

  // rules é a regras que vamos colocar sobre os campos da requisição
  get rules() {
    return {
      username: "required|unique:users",
      email: "required|email|unique:users",
      password: "required|confirmed"
    };
  }
}

module.exports = User;
