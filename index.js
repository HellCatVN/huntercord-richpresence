"use strict";
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain
const path = require('path')

try {
	require('electron-reload')(__dirname);
} catch (_) {}

var mainWindow = null;

app.on("window-all-closed", function() {
  if (process.platform != "darwin") app.quit();
});

app.on("ready", function() {
  const windowOptions = {
    width: 920,
    minWidth: 680,
    height: 690,
    title: app.getName(),
    webPreferences: {
      nodeIntegration: true
    }
  };

  mainWindow = new BrowserWindow(windowOptions);
  mainWindow.loadURL(path.join("file://", __dirname, "/index.html"));

  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

ipc.on('state', (event, arg) => {
  console.log(arg)
})