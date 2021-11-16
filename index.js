const inquirer = require("inquirer");
const fs = require("fs");
let employees = [];

const Employee = {
  Intern: "Intern",
  Engineer: "Engineer",
  Manager: "Manager",
  Employee: "Employee",
};

const questions = () => {
  console.log("inside questions");
  return [
    {
      type: "list",
      name: "employeeType",
      question: "What type of employee?",
      choices: [Employee.Intern, Employee.Engineer, Employee.Manager],
    },
    {
      type: "input",
      name: "school",
      message: "What school are you interning through?",
      when: (answers) => answers.employeeType === Employee.Intern,
    },
  ];
};

const displayEmployees = (employees) => {
  console.log("started displayEmployees", employees);
  employees.forEach((e) => {
    console.log("Employee Role", e.role);
    switch (e.role) {
      case Employee.Intern:
        console.log("We have an intern");
        employees.push(`<h2>${Employee.Intern}</h2><p>Name: ${e.name}</p>`);
        break;

      case Employee.Engineer:
        break;

      case Employee.Manager:
        break;

      default:
        break;
    }
  });
  return employees;
};

const generateHTML = (employees, answers) => {
  console.log("Entering generateHtml");
  return `<!DOCTYPE html>
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

// Write to HTML file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    err ? console.error(`We had an error: ${err}`) : console.log("Success!");
  });
}

// Initialize application
function init() {
  console.log("Starting application");
  inquirer.prompt(questions()).then((answers) => {
    console.log("entering questions");
    writeToFile("./dist/index.html", generateHTML(employees, answers));
  });
}

// Invoke the init function to start the questions
init();
