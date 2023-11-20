// pythonPath.js

const { execSync } = require('child_process');
const os = require('os');
const readlineSync = require('readline-sync');

function findPythonPath() {
  try {
    let command;
    if (os.platform() === 'win32') {
      command = 'where python';
      let pythonPath = execSync(command).toString().trim();
      if (!pythonPath) {
        command = 'where python3';
        pythonPath = execSync(command).toString().trim();
      }
      return pythonPath;
    } else {
      command = 'which python3';
      return execSync(command).toString().trim();
    }
  } catch (error) {
    console.error('Error finding Python path:', error.message);
    return null;
  }
}

function getPythonPath() {
  let pythonPath = findPythonPath();

  if (!pythonPath) {
    console.log('Python not found. Please specify the Python path:');
    pythonPath = readlineSync.question('Python path: ');
  }

  return pythonPath;
}

module.exports = {
  getPythonPath,
};
