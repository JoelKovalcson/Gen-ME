const generateMarkdown = require('./utils/generateMarkdown.js');
const getUserInput = require('./utils/getUserInput');
const fs = require('fs');

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
    getUserInput().then(data => {
        console.log(data);
        // Hardcode README.md name for now
        writeToFile(outputPath + 'README.md', data);
    });
}

init();