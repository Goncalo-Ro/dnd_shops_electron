const { app, BrowserWindow } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.



// Handle switching between sections
function showSection(section) {
  // Hide all sections
  const sections = document.querySelectorAll('.section');
  sections.forEach((s) => {
      s.style.display = 'none';
  });

  // Show the selected section
  const selectedSection = document.getElementById(`${section}-section`);
  if (selectedSection) {
      selectedSection.style.display = 'block';
  }
}

// Initial section to show (you can change this based on your needs)
showSection('locations');


const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the database');
        // Perform database operations here
    }
});

// Example query: Select all rows from a hypothetical 'locations' table
db.all('SELECT * FROM locations', [], (err, rows) => {
    if (err) {
        console.error('Error executing query:', err.message);
    } else {
        console.log('Rows retrieved:', rows);
    }
});

// Close the database connection when your app exits
process.on('exit', () => {
    db.close((err) => {
        if (err) {
            return console.error('Error closing the database connection:', err.message);
        }
        console.log('Closed the database connection');
    });
});

