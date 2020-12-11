const path = require('path');
const fs = require('fs');
const execa = require('execa');
const semver = require('semver');
const inquirer = require('inquirer');

const pkgJSON = require(`${process.cwd()}/package.json`);
const curVersion = pkgJSON.version;

/* eslint-disable */
const release = async () => {
  console.log(`Current version: ${curVersion}`);

  const bumps = ['patch', 'minor', 'major', 'prerelease'];
  const versions = {};
  bumps.forEach((b) => {
    versions[b] = semver.inc(curVersion, b);
  });
  const bumpChoices = bumps.map((b) => ({ name: `${b} (${versions[b]})`, value: b }));

  const { bump, customVersion } = await inquirer.prompt([
    {
      name: 'bump',
      message: 'Select release type:',
      type: 'list',
      choices: [...bumpChoices, { name: 'custom', value: 'custom' }]
    },
    {
      name: 'customVersion',
      message: 'Input version:',
      type: 'input',
      when: (answers) => answers.bump === 'custom'
    }
  ]);

  const version = customVersion || versions[bump];

  const { yes } = await inquirer.prompt([
    {
      name: 'yes',
      message: `Confirm releasing ${version}?`,
      type: 'confirm'
    }
  ]);

  const releaseType = semver.diff(curVersion, version);

  // 更新 package.json
  const pkgPath = path.resolve(__dirname, '../package.json');
  pkgJSON.version = semver.inc(pkgJSON.version, releaseType);
  fs.writeFileSync(pkgPath, JSON.stringify(pkgJSON, null, 2));

  // git 发布
  let tagName = `${version}`;
  await execa('git', ['add', '-A'], { stdio: 'inherit' });
  await execa('git', ['commit', '-m', `chore: ${tagName}`], { stdio: 'inherit' });
  await execa('git', ['tag', tagName], { stdio: 'inherit' });
  await execa('git', ['push', '--tags'], { stdio: 'inherit' });
  await execa('git', ['push', 'origin', 'master']);

  // npm 发布
  await execa.sync('npm', ['publish'], {
    stdio: 'inherit',
    cwd: path.dirname(pkgPath)
  });
};

release().catch((err) => {
  console.error(err);
  process.exit(1);
});
