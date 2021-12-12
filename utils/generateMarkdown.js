// Object property lookup tables for different 
const licenseLookup = {
	Apache: {
		badge: 'https://img.shields.io/badge/License-Apache_2.0-blue.svg',
		link: 'https://opensource.org/licenses/Apache-2.0'
	},
	Boost: {
		badge: 'https://img.shields.io/badge/License-Boost_1.0-lightblue.svg',
		link: 'https://www.boost.org/LICENSE_1_0.txt'
	},
	Eclipse: {
		badge: 'https://img.shields.io/badge/License-EPL_1.0-red.svg',
		link: 'https://opensource.org/licenses/EPL-1.0'
	},
	IBM: {
		badge: 'https://img.shields.io/badge/License-IPL_1.0-blue.svg',
		link: 'https://opensource.org/licenses/IPL-1.0'
	},
	ISC: {
		badge: 'https://img.shields.io/badge/License-ISC-blue.svg',
		link: 'https://opensource.org/licenses/ISC'
	},
	MIT: {
		badge: 'https://img.shields.io/badge/License-MIT-yellow.svg',
		link: 'https://opensource.org/licenses/MIT'
	},
	SIL: {
		badge: 'https://img.shields.io/badge/License-OFL_1.1-lightgreen.svg',
		link: 'https://opensource.org/licenses/OFL-1.1'
	},
	Unlicense: {
		badge: 'https://img.shields.io/badge/license-Unlicense-blue.svg',
		link: 'http://unlicense.org/'
	},
	WTFPL: {
		badge: 'https://img.shields.io/badge/License-WTFPL-brightgreen.svg',
		link: 'http://www.wtfpl.net/about/'
	},
	Zlib: {
		badge: 'https://img.shields.io/badge/License-Zlib-lightgrey.svg',
		link: 'https://opensource.org/licenses/Zlib'
	}
}

function renderLicense(data) {
	if(!data.confirmLicense) return '';
	return `## License
This project is licensed under the \`${data.licenseType}\` license as described [here](${licenseLookup[data.licenseType].link}).`;
}

function renderContribute(data) {
	if(!data.confirmContribute) return '';
	return `## Contributing
${data.contribute}
`
}

function renderQuestions(data) {
	if(!(data.confirmGithub || data.confirmEmail)) return '';
	let res = "## Questions\nIf you have any questions please send them to:";
	if(data.confirmGithub) res += `\n* ${data.github}`;
	if(data.confirmEmail) res += `\n* ${data.email}`;
	return res;
}

function renderTests(data) {
	if(!data.confirmTest) return '';
	let res = "## Tests";
	for(let i = 0; i < data.tests.length; i++) {
		res += `\n${i+1}. ${data.tests[i]}`;
	}
	return res;
}

function renderUsage(data) {
	if(!data.confirmUsage) return '';
	return `## Usage
${data.usage}
`
}

function renderInstallation(data) {
	if(!data.confirmInstall) return '';
	let res = "## Installation";
	for(let i = 0; i < data.instructions.length; i++) {
		res += `\n${i+1}. ${data.instructions[i]}`;
	}
	return res;
}

function renderDescription(data) {
	return `
## Description
${data.description}`
}

function renderTableOfContents(data) {
	return `
## Table of Contents
* [Description](#description)
${(data.confirmInstall) ? '* [Installation](#installation)': ''}
${(data.confirmUsage) ? '* [Usage](#usage)': ''}
${(data.confirmTest) ? '* [Tests](#tests)': ''}
${(data.confirmGithub || data.confirmEmail) ? '* [Questions](#questions)': ''}
${(data.confirmContribute) ? '* [Contributing](#contributing)': ''}
${(data.confirmLicense) ? '* [License](#license)': ''}`
}

function renderTitle(data) {
	return `# ${data.title}`;
}

function renderLicenseBadge(data) {
	if (data.confirmLicense) {
		return `[![License](${licenseLookup[data.licenseType].badge})](${licenseLookup[data.licenseType].link})\n`
	} else return "";
}

function generateMarkdown(data) {
	let res =`
${renderLicenseBadge(data)}

${renderTitle(data)}

${renderTableOfContents(data)}

${renderDescription(data)}

${renderInstallation(data)}

${renderUsage(data)}

${renderTests(data)}

${renderQuestions(data)}

${renderContribute(data)}

${renderLicense(data)}
`
	return res;
}

module.exports = generateMarkdown;