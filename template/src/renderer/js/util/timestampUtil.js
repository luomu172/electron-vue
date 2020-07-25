import { SysControllerService } from '../api/teaching-service/sys-controller.service';
import { AuthLoginControllerService } from '../../js/api/teaching-service/auth-login-controller.service';
import { StorageUtils } from '../../js/util/storage';

class TimestampUtil {
  delta = 0;
  constructor () {
    this.init();
  }

  async init () {
    if (!StorageUtils.getToken()) {
      return false
    }

    try {
      const data = await AuthLoginControllerService.check();
      if (data.code !== 10090001 && data.success !== false) {
        this.getTime();
      }
    } catch (error) {}
  }

  getTime () {
    SysControllerService.timestamp()
      .then(data => {
        if (data) {
          this.delta = data - Date.now();
          console.log(`使用服务器时间校准，误差 ${this.delta}`);
        }
      });
  }

  now () {
    return Date.now() + this.delta;
  }
}

export const timestampUtil = new TimestampUtil();
