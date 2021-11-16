const Employee = require("./Employee");
// In addition to `Employee`'s properties and methods, `Engineer` will also have the following:
// * `github`&mdash;GitHub username
// * `getGithub()`
// * `getRole()`&mdash;overridden to return `'Engineer'`
class Engineer extends Employee {
  constructor(username) {
    this.username = username;
  }
  getGithub() {
    return `[https://github.com/${this.username}](https://github.com/${this.username})`;
  }
  getRole() {
    return "Engineer";
  }
}
