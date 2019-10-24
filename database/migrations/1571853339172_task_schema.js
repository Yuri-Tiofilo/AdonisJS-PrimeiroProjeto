"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TaskSchema extends Schema {
  up() {
    this.create("tasks", table => {
      table.increments();
      table
        .integer("project_id")
        .unsigned() // apenas valores positivos
        .notNullable()
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE") // caso este campo sofra alteração na tabela de usuários é necessario que ele tambem faça as alterações nesta tabela
        .onDelete("CASCADE"); //caso delete o projeto será necessario tambem que delete as tarefas
      table
        .integer("user_id")
        .unsigned() // apenas valores positivos
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE") // caso este campo sofra alteração na tabela de usuários é necessario que ele tambem faça as alterações nesta tabela
        .onDelete("SET NULL"); //caso delete o usuário é necessario que não delete o projeto apenas coloque no user == null
      table
        .integer("file_id")
        .unsigned() // apenas valores positivos
        .references("id")
        .inTable("files")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.string("title").notNullable();
      table.text("description");
      table.timestamp("due_date");
      table.timestamps();
    });
  }

  down() {
    this.drop("tasks");
  }
}

module.exports = TaskSchema;
