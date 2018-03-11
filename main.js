const {app, BrowserWindow, ipcMain, remote, globalShortcut} = require('electron'),
  glob = require('glob'),
  path = require('path'),
  url = require('url');

let mainWindow, loginWindow;

global.sharedObject = {
  cookies: '',
  csrf: ''
};

function initialize() {
  const files = glob.sync(path.join(__dirname, 'app/js/main/*.js'))
  files.forEach((file) => {
    require(file);
  })
}

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app', 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  // Login Window
  loginWindow = new BrowserWindow({
    parent: mainWindow,
    width: 640,
    height: 480
  });
  loginWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app', 'login.html'),
    protocol: 'file:',
    slashes: true
  }));

  loginWindow.on('closed', function () {
    loginWindow = null;
  });
  
  /**
   * Global shortcuts.
   */
  globalShortcut.register('Ctrl+U', () => {
    mainWindow.webContents.send('paste-image');
  })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
})

initialize();