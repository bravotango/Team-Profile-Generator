const Employee = require("./Employee.js");
// In addition to `Employee`'s properties and methods, `Manager` will also have the following:
// * `officeNumber`
// * `getRole()`&mdash;overridden to return `'Manager'`

class Manager extends Employee {
  constructor(officeNumber) {
    this.officeNumber = officeNumber;
  }

  getRole() {
    return "Manager";
  }
}
