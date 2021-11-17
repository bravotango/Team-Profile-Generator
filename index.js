const inquirer = require("inquirer");
const Manager = require("./lib/Manager.js");
const Intern = require("./lib/Intern.js");
const Engineer = require("./lib/Engineer.js");
const fs = require("fs");

let employees = [];

const Employee = {
  Intern: "Intern",
  Engineer: "Engineer",
  Manager: "Manager",
};

const htmlCard = (e) => {
  let roleInfo;
  switch (e.getRole()) {
    case Employee.Manager:
      roleInfo = `Office #: ${e.officeNumber}`;
      break;
    case Employee.Intern:
      roleInfo = `School: ${e.getSchool()}`;
      break;
    case Employee.Engineer:
      roleInfo = `Github: ${e.getGithub()}`;
      break;
  }
  return `<div class='card'><h5 class='card-header'>${e.getRole()}</h5><div class='card-body'><h5>Name: ${e.getName()}</h5><p>Id: ${e.getName()}</p><p><a href="mailto:${
    e.employeeEmail
  }">${e.getEmail()}</a></p><p>${roleInfo}</p></div></div>`;
};

const displayEmployees = (employees) => {
  let employeesHtmlArray = [];
  employees.forEach((e) => {
    employeesHtmlArray.push(htmlCard(e));
  });
  return employeesHtmlArray.join("");
};

const generateHTML = (employees) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
      <title>Team Profile</title>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <h1>Meet the Team</h1>
      </div>
       ${displayEmployees(employees)}
    </div>
  </body>
  </html>`;
};

// Write to HTML file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    err ? console.error(`We had an error: ${err}`) : console.log("Success!");
  });
}

const questions = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is the team manager's name?",
      },
      {
        type: "input",
        name: "managerId",
        message: "What is the manager's employee ID?",
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is the manager's email address?",
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is the manager's office number?",
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.managerName,
        answers.managerId,
        answers.managerEmail,
        answers.managerOfficeNumber
      );
      employees.push(manager);
      repeatQuestions();
    });
};

const repeatQuestions = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What type of employee are you adding?",
        name: "employeeType",
        choices: [new inquirer.Separator(), Employee.Intern, Employee.Engineer],
      },
      {
        type: "input",
        message: "What is the employee name?",
        name: "employeeName",
      },
      {
        type: "input",
        message: "What is the employee's Email?",
        name: "employeeEmail",
      },
      {
        type: "input",
        message: "What is the employee's Id?",
        name: "employeeId",
      },
      {
        type: "input",
        message: "What school is the intern from?",
        name: "internSchool",
        when: (answers) => answers.employeeType === Employee.Intern,
      },
      {
        type: "input",
        message: "What is the engineer's gitHub username?",
        name: "engineerGitHubUsername",
        when: (answers) => answers.employeeType === Employee.Engineer,
      },
      {
        type: "confirm",
        message: "Do you have another employee to add?",
        name: "repeat",
      },
    ])
    .then((answers) => {
      if (answers.employeeType === Employee.Intern) {
        const intern = new Intern(
          answers.employeeName,
          answers.employeeId,
          answers.employeeEmail,
          answers.internSchool
        );
        employees.push(intern);
      }
      if (answers.employeeType === Employee.Engineer) {
        const engineer = new Engineer(
          answers.employeeName,
          answers.employeeId,
          answers.employeeEmail,
          answers.engineerGitHubUsername
        );
        employees.push(engineer);
      }
      if (answers.repeat === true) {
        repeatQuestions();
      } else {
        writeToFile("./dist/index.html", generateHTML(employees));
      }
    });
};

// Initialize application
function init() {
  questions();
}

// Invoke the init function to start the questions
init();
