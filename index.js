const inquirer = require("inquirer");
const colors = require("colors");
const fs = require('fs')

function generateLicenseBadge(license) {
    const badgeURLs = {
        "Apache license 2.0	Apache-2.0": "[![License: Apache_2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",

        "Boost Software License 1.0	BSL-1.0": "[![License: Boost_1.0](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)",

        "BSD 3-clause 'New' or 'Revised' license	BSD-3-Clause": "[![License: BSD_3--Clause](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)",

        "BSD 2-clause 'Simplified' license	BSD-2-Clause": "[![License: BSD_2--Clause](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)",

        "Creative Commons Zero v1.0 Universal	CC0-1.0": "[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)",

        "Creative Commons Attribution 4.0	CC-BY-4.0": "[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)",

        "Creative Commons Attribution ShareAlike 4.0	CC-BY-SA-4.0": "[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC_BY--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)",

        "Eclipse Public License 1.0	EPL-1.0": "[![License: EPL 1.0](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)",
        
        "GNU Affero General Public License v3.0	AGPL-3.0": "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)",

        "GNU General Public License v3.0	GPL-3.0": "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)",

        "GNU General Public License v2.0	GPL-2.0": "[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)",

        "GNU Lesser General Public License v3.0	LGPL-3.0": "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)",

        "ISC	ISC": "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)",

        "MIT	MIT": "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",

        "Mozilla Public License 2.0	MPL-2.0": "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)",

        "Artistic license 2.0	Artistic-2.0": "[![License: Artistic-2.0](https://img.shields.io/badge/License-Artistic_2.0-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)",

        "The Unlicense	Unlicense": "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)",

        "zLib License	Zlib": "[![License: Zlib](https://img.shields.io/badge/License-Zlib-lightgrey.svg)](https://opensource.org/licenses/Zlib)"
    };
    // Return badge URL if found, otherwise return empty string
    return badgeURLs[license] || '';
}

inquirer
    .prompt([
        {
            type: "input",
            message: colors.magenta("What is your project title?"),
            name: "title",
        },
        {
            type: "input",
            message: colors.magenta("Provide a short description explaining the what, why, and how of your project"),
            name: "description",
        },
        {
            type: "input",
            message: colors.magenta("What are the steps required to install your project?"),
            name: "installation",  
        },
        {
            type: "input",
            message: colors.magenta("Please provide instructions and examples for use"),
            name: "usage",  
        },
        {
            type: "input",
            message: colors.magenta("Please provide test instructions"),
            name: "test",  
        },
        {
            type: "input",
            message: colors.magenta("Please list any collaborators"),
            name: "collaborators",  
        },
        {
            type: "input",
            message: colors.magenta("What is your github username?"),
            name: "github",  
        },
        {
            type: "input",
            message: colors.magenta("What is your email address?"),
            name: "email",  
        },
        {
            type: "list",
            message: colors.magenta("Do you have any licenses for this work?"),
            name: "license",
            choices: [
                "Apache license 2.0	Apache-2.0",
                "Artistic license 2.0	Artistic-2.0",
                "Boost Software License 1.0	BSL-1.0",
                "BSD 2-clause 'Simplified' license	BSD-2-Clause",
                "BSD 3-clause 'New' or 'Revised' license	BSD-3-Clause",
                "Creative Commons Zero v1.0 Universal	CC0-1.0",
                "Creative Commons Attribution 4.0	CC-BY-4.0",
                "Creative Commons Attribution ShareAlike 4.0	CC-BY-SA-4.0",
                "Eclipse Public License 1.0	EPL-1.0",
                "GNU Affero General Public License v3.0	AGPL-3.0",
                "GNU General Public License v3.0	GPL-3.0",
                "GNU General Public License v2.0	GPL-2.0",
                "GNU Lesser General Public License v3.0	LGPL-3.0",
                "ISC	ISC",
                "MIT	MIT",
                "Mozilla Public License 2.0	MPL-2.0",
                "The Unlicense	Unlicense",
                "zLib License	Zlib",
                "N/A"
            ]
        }
    ])
    .then((response) => {
        fs.appendFile(`./output/${response.title}.md`,`# ${response.title}
` + generateLicenseBadge(response.license) + `

## Description

${response.description}

## Table of Contents

[Installation](#installation)

[Usage](#usage)

[Collaborators](#collaborators)

[Questions](#questions)

[License](#license)

## Installation

${response.installation}

## Usage

${response.usage}

## Test

${response.test}

## Collaborators

${response.collaborators}

## Questions

Github profile: (https://github.com/${response.github})

Please direct any questions to ${response.email}

## License

${response.license}`,
        (err) => {
            err ? console.error(err) : console.log('README created!');
        })

    })