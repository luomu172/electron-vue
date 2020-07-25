
export function sleep (time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

// execute a function and retry when error
export function executeWithRetry (func, { retryTime, interval, taskName }) {
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < retryTime; i++) {
      try {
        await func();
        return resolve(true);
      } catch (error) {
        console.error(`${taskName}错误，${interval}秒后重试`);
        console.error(error);
        await sleep(interval * 1000);
      }
    }
    console.error(`${taskName}错误，无法进行下载`);
    reject(new Error(`多次执行${taskName}失败`));
  })
}
