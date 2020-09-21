// import { ipcMain } from 'electron';

export function ipcMainEventListener () {
  // ipcMain.on(GET_STORAGE, getStorageHandler);
}

const windowMap = new Map();
export function setWindow ({ name = 'main', window }) {
  if (windowMap.has(name)) {
    console.error(`重复设置窗口 ${name}`);
  } else {
    windowMap.set(name, window);
  }
}

export function getWindow (name = 'main') {
  return windowMap.get(name);
}
