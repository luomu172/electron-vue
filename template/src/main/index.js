{{#if_eq eslintConfig 'standard'}}
'use strict'

{{/if_eq}}
import { app, BrowserWindow } from 'electron'{{#if_eq eslintConfig 'airbnb'}} // eslint-disable-line{{/if_eq}}
import { autoUpdate } from './autoUpdate';
import { initLog } from './util/log';
import { ipcMainEventListener, setWindow } from './IPCMain';

  /**
   * Set `__static` path to static files in production
   * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
   */
  if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\'){{#if_eq eslintConfig 'airbnb'}} // eslint-disable-line{{/if_eq}}
  }


  let mainWindow
  const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

  function createWindow () {
    initLog();
    if (process.env.NODE_ENV === 'production') {
      autoUpdate()
    }

    ipcMainEventListener()

    /**
     * Initial window options
     * +
     */
    mainWindow = new BrowserWindow({
      width: 800,
      height: 480,
      center: true,
      useContentSize: true,
      transparent: false,
      frame: false, // 无边框模式
      resizable: true,
      // opacity: 0.5,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
        allowRunningInsecureContent: true
      }
    })

    setWindow({ window: mainWindow });

    mainWindow.loadURL(winURL);

    mainWindow.on('closed', () => {
      mainWindow = null
    })
  }

  const gotTheLock = app.requestSingleInstanceLock();
  if (!gotTheLock) {
    app.quit()
  } else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
      // 当运行第二个实例时,将会聚焦到mainWindow这个窗口
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.focus()
      }
    })

    // 创建 mainWindow, 加载应用的其余部分, etc...
    app.commandLine.appendSwitch('high-dpi-support', 1);
    app.commandLine.appendSwitch('force-device-scale-factor', 1);
    app.commandLine.appendSwitch('disable-site-isolation-trials'); // 不限制跨域
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
  }

  {{#if_eq builder 'builder'}}

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
  {{/if_eq}}
