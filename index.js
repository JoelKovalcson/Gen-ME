const generateMarkdown = require('./utils/generateMarkdown.js');
const getUserInput = require('./utils/getUserInput');
const fs = require('fs');

// Output file path
const outputPath = "./out/";

function writeToFile(fileName, data) {
	let md = generateMarkdown(data);
	fs.writeFile(fileName, md, err => {
		if (err) {
			console.log("There was an error generating your README file.");
		} else {
			console.log("\nREADME successfully generated.\nCheck the 'out' folder for your new README and make sure to save it elsewhere before making a new one!");
		}
	});
}


function init() {
	// After user input is obtained, write the new README with the data
	getUserInput().then(data => {
		// Make the out directory if it doesn't exist
		try {
			fs.mkdirSync('./out');
			writeToFile(outputPath + 'README.md', data);
		} catch {
			writeToFile(outputPath + 'README.md', data);
		}
	});
}

init();