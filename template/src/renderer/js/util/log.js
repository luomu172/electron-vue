import { remote } from 'electron';
import { isDevEnv } from '../../../main/util/util';
window.logger = remote.getGlobal('log');
export function extendConsole (console, type) {
  if (isDevEnv()) return;

  if (!console) {
    console = window.console;
  }
  if (!type) {
    type = 'default';
  }
  const log = logger.create(`chrome-${type}`);
  const chromeLog = log.scope(`业务日志-${type}`);
  Object.assign(console, chromeLog);
}
