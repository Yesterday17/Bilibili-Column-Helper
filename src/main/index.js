/*
 * MIT License
 *
 * Copyright (c) 2018 Yesterday17
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
*/

'use strict'

import { app, BrowserWindow, BrowserView, ipcMain } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__statihtmlWebc = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}

let mainWindow, loginView
const winURL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow () {
  mainWindow = new BrowserWindow({
    height: 720,
    minHeight: 720,
    useContentSize: true,
    width: 1280,
    minWidth: 1280,
    frame: false,
    webPreferences: {
      webSecurity: false
    },
    show: false
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
}

function createLoginView () {
  loginView = new BrowserView()
  loginView.setAutoResize({ width: true, height: true })
  loginView.setBounds({
    x: 0,
    y: 0,
    width: mainWindow.getSize()[0],
    height: mainWindow.getSize()[1]
  })
  loginView.webContents.loadURL(
    'https://passport.bilibili.com/ajax/miniLogin/minilogin'
  )
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('show-login-view', () => {
  createLoginView()
  // loginView.webContents.toggleDevTools()
  loginView.webContents.executeJavaScript(
    `let hide = function (event) {
      const ipcRenderer = require('electron').ipcRenderer
      ipcRenderer.send('hide-login-view')
    }
    let stop = function (event) {
      event.stopPropagation()
    }
    $('body').click(hide)
    $('#content').click(stop)
    $('#close').click(hide)`
  )
  mainWindow.setBrowserView(loginView)
})

ipcMain.on('hide-login-view', () => {
  if (mainWindow.getBrowserView()) {
    mainWindow.setBrowserView(null)
    loginView.destroy()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
