// Object property lookup tables for different 

const licenseLookup = {
  Apache: {
    badge: 'https://img.shields.io/badge/License-Apache_2.0-blue.svg',
    link: 'https://opensource.org/licenses/Apache-2.0'
  }
}

function renderLicenseSection(license) {
  if(license.hasLicense) {
    return `[![License](${licenseLookup[license.licenseType].badge})](${licenseLookup[license.licenseType].link})\n`
  }
  else return "";
}

function generateMarkdown(data) {
  let res = 
`${renderLicenseSection(data)}# ${data.title}
`
  return res;
}

module.exports = generateMarkdown;