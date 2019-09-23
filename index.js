"use strict";
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
const path = require("path");
var clientId = "623158795287134218";
const RPC = require("discord-rpc");
const rpc = new RPC.Client({ transport: "ipc" });
// const scopes = ["rpc", "rpc.api", "messages.read"];

try {
  require("electron-reload")(__dirname);
} catch (_) {}

var options = {
  state: "Engare the fight",
  details: "Chaos Mode",
  startTimestamp: new Date(),
  largeImageKey: "solo",
  largeImageText: "Unknow Level",
  smallImageKey: "solo",
  smallImageText: "Elementary King",
  // partyId: "Solo Player",
  // partySize: 1,
  // partyMax: 1,
  // matchSecret: "hellcatmatch",
  // joinSecret: "hellcatjoin",
  // spectateSecret: "Nothing to watch",
  // instance: true
};

try {
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

  ipc.on("state", (event, arg) => {
    console.log(arg);
  });

  rpc.on("ready", () => {
    console.log("Ready!!");
    rpc.setActivity(options);
  });

  // Log in to RPC with client id
  rpc.login({ clientId });
} catch (e) {
  console.log(e);
}
