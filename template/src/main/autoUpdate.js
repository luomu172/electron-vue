// 检查是否有最新版本: 每天凌晨2点 || 每次进入登录页面
// 新版本的安装机制:  每天的8点之前 || 当前页面是登录页提示用户是否安装
import { BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import { SHOW_CONFIRM_UPDATE, CHECK_UPDATE, INSTALL_UPDATE } from './util/constance';
import * as schedule from 'node-schedule';
const log = require('electron-log')

export function autoUpdate (event) {
  setUpdateUrl();
  schedule.scheduleJob('0 0 2 * * *', () => {
    checkForUpdate();
  });
}

function setUpdateUrl () {
  autoUpdater.logger = log
  const env = BUILD_ENV ? `${BUILD_ENV}-` : ''
  //TODO 应用更新地址
  const server = `http://${env}download-ss-client.xiaojiaoyu100.com`
  log.info('autoUpdate-server:', server)
  autoUpdater.setFeedURL(server)
}

export function checkForUpdate () {
  autoUpdater.checkForUpdates()
}

ipcMain.on(CHECK_UPDATE, checkForUpdate)

ipcMain.on(INSTALL_UPDATE, () => {
  autoUpdater.quitAndInstall();
})

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  log.info(`更新下载完成`);
  const hours = new Date().getHours();
  const focusedWindow = BrowserWindow.getFocusedWindow();
  const isLoginPage = focusedWindow.getTitle() === 'loginPage';
  if (hours < 8) {
    // 检测有新版本直接更新
    autoUpdater.quitAndInstall();
  } else if (isLoginPage) {
    focusedWindow.webContents.send(SHOW_CONFIRM_UPDATE);
  }
})

autoUpdater.on('update-available', data => {
  log.info('有待更新版本，信息如下：');
  log.info(data);
})

autoUpdater.on('update-not-available', e => {
  log.info('无待更新版本');
})

autoUpdater.on('error', message => {
  log.error('更新错误，错误信息如下：')
  log.error(message)
})
