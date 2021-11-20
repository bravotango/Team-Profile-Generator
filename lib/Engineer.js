const Employee = require("./Employee");
// In addition to `Employee`'s properties and methods, `Engineer` will also have the following:
// * `github`&mdash;GitHub username
// * `getGithub()`
// * `getRole()`&mdash;overridden to return `'Engineer'`
class Engineer extends Employee {
  constructor(name, id, email, username) {
    super(name, id, email);
    this.username = username;
  }
  getGithub() {
    return `<a href="https://github.com/${this.username}" target="_blank">https://github.com/${this.username}</a>`;
  }
  getRole() {
    return "Engineer";
  }
}

module.exports = Engineer;
