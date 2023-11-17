// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// preload.js

// Expose a subset of Node.js APIs to the renderer process
const { ipcRenderer, contextBridge } = require('electron');

// Expose specific Node.js APIs to the renderer process
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: ipcRenderer,
  // Add more APIs as needed...
});
