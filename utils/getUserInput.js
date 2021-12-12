const inquirer = require("inquirer");

const questions = [{
        type: 'input',
        name: 'title',
        message: 'What is your Project Title? (Required)',
        validate: titleInput => {
            if (titleInput) return true;
            else return 'Please enter your Project Title!';
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please enter a project description. (Required)',
        validate: descInput => {
            if (descInput) return true;
            else return 'Please provide a Project Description!';
        }
    },
    
];

function getUserInput() {
    // Object to hold user input
    return inquirer.prompt(questions);
}

module.exports = getUserInput;