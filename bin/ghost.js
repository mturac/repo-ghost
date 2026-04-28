#!/usr/bin/env node
const chalk = require('chalk');
const { execSync } = require('child_process');

try {
  // Get deleted files from git
  const deletedFiles = execSync('git log --diff-filter=D --summary | grep delete', { encoding: 'utf8', cwd: process.cwd() });
  
  console.log('\n' + chalk.gray('👻 REPO GHOST'));
  console.log(chalk.gray('Ghosts of deleted code:\n'));
  
  if (deletedFiles) {
    const lines = deletedFiles.split('\n').slice(0, 5);
    lines.forEach(line => {
      if (line.trim()) {
        console.log(chalk.gray('  👻'), chalk.white(line.replace('delete', '').trim()));
      }
    });
    console.log('');
  } else {
    console.log(chalk.gray('  No ghosts found. Your repo is too clean.\n'));
  }
} catch (e) {
  console.log('\n' + chalk.gray('👻 REPO GHOST'));
  console.log(chalk.gray('  Run this in a git repository to see deleted code ghosts.\n'));
}
