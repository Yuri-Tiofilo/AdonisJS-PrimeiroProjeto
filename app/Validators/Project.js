"use strict";

class Project {
  get validateAll() {
    return true;
  }
  get rules() {
    return {
      title: "required",
      descrption: "required"
    };
  }
}

module.exports = Project;
