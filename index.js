const generateMarkdown = require('./utils/generateMarkdown.js');
const getUserInput = require('./utils/getUserInput');
const fs = require('fs');

const questions = [

];

const outputPath = "./out/";

function writeToFile(fileName, data) {
    let md = generateMarkdown(data);
    fs.writeFile(fileName, md, err => {
        if(err) {
            console.log("There was an error generating your README file.");
        }
        else {
            console.log("\nREADME successfully generated.\nCheck the 'out' folder for your new README and make sure to save it before making a new one!");
        }
    });
}


function init() {
    let data = getUserInput(questions);

    // Hardcode README.md name for now
    writeToFile(outputPath + 'README.md', data);
}

init();