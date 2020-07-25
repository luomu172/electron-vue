/**
 * 操作客户端窗口的工具类
 * 操作窗口的API：https://www.electronjs.org/docs/api/browser-window#winsetpositionx-y-animate
 */
import { GET_CURSOR_SCREEN_POINT } from '../../../main/util/constance'

const { remote, ipcRenderer } = require('electron')

export function setWindowTitle (titleName) {
  remote.getCurrentWindow().setTitle(titleName);
}

// 设置窗口大小
export function setWindowSize (width, height) {
  remote.getCurrentWindow().setSize(width, height)
}

export function setMinimumSize (width, height) {
  remote.getCurrentWindow().setMinimumSize(width, height)
}

// 设置窗口大小并居中
export function setWindowSizeAndSetCenter (width, height) {
  const win = remote.getCurrentWindow();
  const size = remote.screen.getPrimaryDisplay().workAreaSize;
  win.setMinimumSize(width, height)
  win.setBounds({ x: size.width / 2 - width / 2, y: size.height / 2 - height / 2, width, height });
}

export function unmaximize () {
  const win = remote.getCurrentWindow();
  win.unmaximize();
}

export function maximize () {
  const win = remote.getCurrentWindow();
  if (win.isMaximized()) {
    win.unmaximize();
  } else {
    win.maximize();
  }
}

// 最小化
export function minimize () {
  const win = remote.getCurrentWindow();
  win.minimize();
}

// 关闭
export function close () {
  const win = remote.getCurrentWindow();
  win.close();
}

// 移动窗口
export function movePosition (mx, my) {
  const win = remote.getCurrentWindow();
  const pos = win.getPosition();
  let [x, y] = pos;
  x = x + mx;
  y = y + my;
  win.setPosition(x, y);
}

// 当前鼠标的绝对位置。
export function getCursorScreenPoint () {
  const point = ipcRenderer.sendSync(GET_CURSOR_SCREEN_POINT);
  return point;
}
