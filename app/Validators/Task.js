"use strict";

class Task {
  get validateAll() {
    return true;
  }
  get rules() {
    return {
      title: "require",
      due_date: "date"
    };
  }
}

module.exports = Task;
