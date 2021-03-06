// Modules to control application life and create native browser window
const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");

function createWindow() {
  let show = false;
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    frame: false,
    transparent: true,
    fullscreen: true,
    alwaysOnTop: true,
    show: false,
    icon: null,
    resizable: false,
    thickFrame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");
  mainWindow.setSkipTaskbar(true);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  const ret = globalShortcut.register("CommandOrControl+Shift+Z", () => {
    console.log("CommandOrControl+Shift+Z is pressed");
    if (!show) {
      mainWindow.show();
      show = true;
    } else {
      mainWindow.hide();
      show = false;
    }
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  const { screen } = require("electron");
  setInterval(() => {
    const point = screen.getCursorScreenPoint();
    const currentDisplay = screen.getDisplayNearestPoint(point);
    console.log(point, currentDisplay);
  }, 1000);

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("will-quit", () => {
  // Unregister a shortcut.
  globalShortcut.unregister("CommandOrControl+X");

  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
