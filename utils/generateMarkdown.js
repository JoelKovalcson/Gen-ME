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

function renderLicenseSection(license) {
  if (license.confirmLicense) {
    return `[![License](${licenseLookup[license.licenseType].badge})](${licenseLookup[license.licenseType].link})\n`
  } else return "";
}

function generateMarkdown(data) {
  let res =
    `${renderLicenseSection(data)}# ${data.title}
`
  return res;
}

module.exports = generateMarkdown;