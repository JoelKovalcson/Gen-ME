const inquirer = require("inquirer");

const questions = {
    // Project Title
    title: [{
        type: 'input',
        name: 'title',
        message: 'What is your Project Title? (Required)',
        validate: titleInput => {
            if (titleInput) return true;
            else return 'Please enter your Project Title!';
        }
    }],
    // Description
    description: [{
        type: 'input',
        name: 'description',
        message: 'Please enter a Project Description. (Required)',
        validate: descInput => {
            if (descInput) return true;
            else return 'Please provide a Project Description!';
        }
    }],
    // Installation Instructions
    installation: {
        setup: [{
            type: 'confirm',
            name: 'confirmInstall',
            message: 'Does your project have any installation instructions?',
            default: true
        }],
        repeat: [{
                type: 'input',
                name: 'installStep',
                message: 'Please enter the next installation step:'
            },
            {
                type: 'confirm',
                name: 'confirmNextInstall',
                message: 'Would you like to enter another step?',
                default: true
            }
        ]
    },
    // Usage Information
    usage: [{
            type: 'confirm',
            name: 'confirmUsage',
            message: 'Would you like to include any usage information?',
            default: true
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Please enter usage information:',
            when: ({
                confirmUsage
            }) => confirmUsage
        }
    ],
    // Test Instructions
    test: {
        setup: [{
            type: 'confirm',
            name: 'confirmTest',
            message: 'Does your project have any tests?',
            default: true
        }],
        repeat: [{
                type: 'input',
                name: 'testStep',
                message: 'Please enter the next test description:'
            },
            {
                type: 'confirm',
                name: 'confirmNextTest',
                message: 'Would you like to enter another test?',
                default: true
            }
        ]
    },
    // Contribution Guidelines
    contribute: [{
            type: 'confirm',
            name: 'confirmContribute',
            message: 'Would you like to include any contribution guidelines?',
            default: true
        },
        {
            type: 'input',
            name: 'contribute',
            message: 'Please enter contribution guidelines:',
            when: ({
                confirmContribute
            }) => confirmContribute
        }
    ],
    // Contact Information
    contact: [{
            type: 'confirm',
            name: 'confirmGithub',
            message: 'Would you like to include your GitHub profile for questions?',
            default: true
        },
        {
            type: 'input',
            name: 'github',
            message: 'Please enter your GitHub username:',
            when: ({
                confirmGithub
            }) => confirmGithub
        },
        {
            type: 'confirm',
            name: 'confirmEmail',
            message: 'Would you like to include your email for questions?',
            default: true
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please enter your email:',
            when: ({
                confirmEmail
            }) => confirmEmail
        }
    ],
    // License
    license: [{
            type: 'confirm',
            name: 'confirmLicense',
            message: 'Would you like to include a license for your project?',
            default: true
        },
        {
            type: 'list',
            name: 'licenseType',
            message: 'Please pick a license from the following:',
            when: ({
                confirmLicense
            }) => confirmLicense,
            choices: [
                'Apache',
                'Boost',
                'Eclipse',
                'IBM',
                'ISC',
                'MIT',
                'SIL',
                'Unlicense',
                'WTFPL',
                'Zlib'
            ]
        }
    ]
};

const getContribute = (data) => {
    return inquirer.prompt(questions.contribute).then(d => {
        return data = {
            ...data,
            ...d
        };
    })
}

const getTestInfo = (data) => {
    // If no instructions, create array
    if (!data.test) data.test = [];
    // Ask for step information, then if there's another one
    return inquirer.prompt(questions.test.repeat).then(testInfo => {
        // Add the step information to the array
        data.test.push(testInfo.testStep);
        // If there is another question, repeat this process recursively
        if (testInfo.confirmNextTest) {
            return getTestInfo(data);
        } else return data;
    });
}

const getTests = (data) => {
    return inquirer.prompt(questions.test.setup).then(d => {
        if (d.confirmTest) {
            return getTestInfo(d).then(tests => {
                return data = {
                    ...data,
                    ...d,
                    ...tests
                };
            });
        } else {
            return data = {
                ...data,
                ...d
            };
        }
    })
}

const getUsage = (data) => {
    return inquirer.prompt(questions.usage).then(d => {
        return data = {
            ...data,
            ...d
        };
    })
}

const getInstructionInfo = (data) => {
    // If no instructions, create array
    if (!data.instructions) data.instructions = [];
    // Ask for step information, then if there's another one
    return inquirer.prompt(questions.installation.repeat).then(stepInfo => {
        // Add the step information to the array
        data.instructions.push(stepInfo.installStep);
        // If there is another question, repeat this process recursively
        if (stepInfo.confirmNextInstall) {
            return getInstructionInfo(data);
        } else return data;
    });
}

const getInstructions = (data) => {
    return inquirer.prompt(questions.installation.setup).then(d => {
        if (d.confirmInstall) {
            return getInstructionInfo(d).then(instructions => {
                return data = {
                    ...data,
                    ...d,
                    ...instructions
                };
            });
        } else {
            return data = {
                ...data,
                ...d
            };
        }
    })
}

const getDescription = (data) => {
    return inquirer.prompt(questions.description).then(d => {
        return data = {
            ...data,
            ...d
        };
    })
}

const getTitle = () => {
    return inquirer.prompt(questions.title);
}

function getUserInput() {
    // Ask for title
    return getTitle()
        // Ask for description
        .then(getDescription)
        // Ask for installation instructions
        .then(getInstructions)
        // Ask for usage information
        .then(getUsage)
        // Ask for tests
        .then(getTests)
        // Ask for contribution guidelines
        .then(getContribute)
        // Ask for contact information
        .then(getContact)
        // Ask for a license
        .then(getLicense)
}

module.exports = getUserInput;