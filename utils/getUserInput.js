const inquirer = require("inquirer");

// Large object containing multiple question arrays
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

/*
 	The below functions use the Inquirer package, promises, and object merging
	with the spread operator to obtain user information 
*/

const getLicense = (data) => {
	return inquirer.prompt(questions.license).then(d => {
		return data = {
			...data,
			...d
		};
	})
}

const getContact = (data) => {
	return inquirer.prompt(questions.contact).then(d => {
		return data = {
			...data,
			...d
		};
	})
}

const getContribute = (data) => {
	return inquirer.prompt(questions.contribute).then(d => {
		return data = {
			...data,
			...d
		};
	})
}

const getTestInfo = (data) => {
	if (!data.tests) data.tests = [];
	return inquirer.prompt(questions.test.repeat).then(testInfo => {
		data.tests.push(testInfo.testStep);
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
	if (!data.instructions) data.instructions = [];
	return inquirer.prompt(questions.installation.repeat).then(stepInfo => {
		data.instructions.push(stepInfo.installStep);
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