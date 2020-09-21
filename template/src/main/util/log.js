import * as schedule from 'node-schedule';

const log = require('electron-log');
const path = require('path');
const fs = require('fs');

export function initLog () {
  log.transports.console.level = 'info';
  log.transports.file.level = 'debug';
  log.transports.file.maxSize = 10 * 1024 * 1024; // 保存10M的日志
  log.transports.file.archiveLog = archiveLog;
  archiveLog(log.transports.file.getFile().path);
  archiveLogSchedule();
}

function archiveLogSchedule () {
  schedule.scheduleJob('0 59 23 * * *', () => {
    log.info('归档日志文件');
    archiveLog(log.transports.file.getFile().path);
  });
}

function archiveLog (file) {
  try {
    if (typeof file !== 'string') {
      file = file.toString();
    }
    console.log(file);
    const info = path.parse(file);

    const date = new Date();
    const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const dir = path.join(info.dir, dateStr);
    !fs.existsSync(dir) && fs.mkdirSync(dir, { recursive: true }); // 创建存放日志的文件夹
    const files = fs.readdirSync(dir);
    fs.renameSync(file, path.join(info.dir, dateStr, info.name + `-${files.length + 1}` + info.ext));
  } catch (e) {
    log.error('归档日志文件错误，错误信息如下：');
    log.error(e);
  }
}

global.log = log;
