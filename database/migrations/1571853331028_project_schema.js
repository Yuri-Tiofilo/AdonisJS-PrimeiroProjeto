"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProjectSchema extends Schema {
  up() {
    this.create("projects", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned() // apenas valores positivos
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE") // caso este campo sofra alteração na tabela de usuários é necessario que ele tambem faça as alterações nesta tabela
        .onDelete("SET NULL"); //caso delete o usuário é necessario que não delete o projeto apenas coloque no user == null
      table.string("title").notNullable();
      table.text("description").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("projects");
  }
}

module.exports = ProjectSchema;
