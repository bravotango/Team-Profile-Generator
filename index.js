const inquirer = require("inquirer");
const fs = require("fs");

const generateHTML = () => {
  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    ${displayEmployees(employees)}
</body>
</html>`;
};

const displayEmployees = (employees) => {
  var employeesHtml = [];

  employees.forEach((employee) => {
    switch (employee.role) {
      case "Intern":
        break;

      case "Engineer":
        break;

      case "Manager":
        break;

      default:
        break;
    }
  });
};
