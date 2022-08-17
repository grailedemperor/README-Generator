import fs from "fs"; 
import inquirer from "inquirer"; 

function getLicense(license) {
    if (license === "GNU AGPLv3") {
        return "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)";
    } else if (license === "GNU GPLv3") {
        return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
    } else if (license === "GNU LGPLv3") {
        return "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)";
    } else if (license === "Apache 2.0") {
        return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else if (license === "Boost Software 1.0") {
        return "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
    } else if (license === "MIT") {
        return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else {
        return "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
    }
}


function validateInput(answers) {
    if (answers != "") {
        return true;
    } else {
        return "Please input an answer.";
    }
}

const generateReadMe =({title, description, installation, usage, license, contributing, tests, questions1, questions2}) => 
`# ${title}
${getLicense(license)}

## Description

${description}

## Table of Contents 

- [Description](##-Description)
- [Installation](##-Installation)
- [Usage](##-Usage)
- [License](##-License)
- [Contributing](##-Contributing)
- [Tests](##-Tests)
- [Questions](##-Questions)

## Installation

${installation}

## Usage

${usage}

## License

${license}

## Contributing

${contributing}

## Tests

${tests}

## Questions

Please reach out to the following links for questions. 

My Github: (https://github.com/${questions1})

My Email: ${questions2}`;

inquirer
    .prompt([
        { 
          type:'input',
          name: 'title',
          message:'What is your project title?',
          validate: validateInput,
        },
        { 
          type:'input',
          name: 'description',
          message:'Please describe your project:',
          validate: validateInput,
        },
        {
          type:'input',
          name:'installation',
          message:'What are the installation instructions?',
          validate: validateInput,
        },
        {
          type:'input',
          name:'usage',
          message:'What is the usage information?',  
          validate: validateInput,
        },
        {
          type:'input',
          name:'contributing',
          message:'What are the contribution guidelines?',
          validate: validateInput,  
        },
        {
          type:'input',
          name:'tests',
          message:'What are the test instructions?',  
          validate: validateInput,
        },
        {
          type: "list",
          name: "license",
          message: "Please select a license for this project.",
          choices: [
            "GNU AGPLv3",
            "GNU GPLv3",
            "GNU LGPLv3",
            "Apache 2.0",
            "Boost Software 1.0",
            "MIT",
            "Mozilla",
          ],
          validate: validateInput,
        },
        {
          type:'input',
          name:'questions1',
          message:'What is your github username?',
          validate: validateInput,  
        },
        {
          type:'input',
          name:'questions2',
          message:'What is your email?',
          validate: validateInput,
        }
    ])
    .then((answers) => {
        const readMePageContent = generateReadMe(answers);

        fs.writeFile('README.md',readMePageContent, (err) => 
        err ? console.log(err) : console.log('Successfully created README.md!')
        );
    });


