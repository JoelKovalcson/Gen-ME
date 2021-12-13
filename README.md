# Gen-ME

## Description

The foundation for this project was provided by an online bootcamp for [Full-Stack Development](https://bootcamps.vanderbilt.edu/coding/online/landing/). 

This project focused on creating a command-line program obtaining user input to generate a project README.

The requirements for the project were as follows:
* Required Sections
  * Title
  * Table of Contents
    * Must have links that take you to the correct section
  * Description
  * Installation
  * Usage
  * Tests
  * Questions
    * This section has an email and/or github profile
  * Contributing
  * License
    * Must have options to choose from and select
    * Must generate a badge if there is a license
* Use Inquirer.js

## Installation

1. Make sure you have `node` and `git` installed.
2. Clone this repository to a location of your preference.
3. Navigate to this location with a terminal of choice that supports `Inquirer.js`
4. Run the command `npm install`.
5. Run the application with `node index`
6. Follow on screen prompts until you are finished generating your `README.md`
7. The file, `README.md`, will be located in the current directory of your terminal, in a folder called `out`
8. Save this file elsewhere for future use, and proceed to step 5 to generate more.

## Guide

For a visual guide of the above steps, watch [this video](https://youtu.be/Tl7K5Msqds8).

## What I Did

Initially I started this working on writing a file containing some sample markdown. Afterwards I focused my efforts on generating the questions and learning how to use Inquirer.js between a lot of planning. Inquirer took me a little bit of time to get used to as I was learning promises at the time, but when I got more comfortable the user input section was finished. Lastly I finished up by completing the string manipulation required to generate the raw markdown for the README file.
