const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const os = require('os');
const readlineSync = require('readline-sync');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true, // Enable Context Isolation
      preload: path.join(__dirname, 'preload.js'), // Path to preload script
      // Additional webPreferences options...
    },
  });

  mainWindow.loadFile('src/index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// Check if the database file exists before creating the main window
const createDatabase = require('./createDatabase');
const pythonPath = getPythonPath();
  console.log('Python path:', pythonPath);
// Check if the database file exists before creating the main window
const dbPath = path.join(__dirname, 'database.db');
if (!fs.existsSync(dbPath)) {
  // Create the database and tables if the file doesn't exist
  createDatabase();
} else {
  console.log('Database file already exists. Skipping creation.');
}

// Create the main window when the app is ready
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (mainWindow === null) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


// put here all functions that can only be use in the backend

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