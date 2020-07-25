/**
 * config.js 配置文件
 * @description
 * @author Whilconn <798490319@qq.com>
 * @date 2018/8/4 0:49
 */
/**
 * swaggerUrl: string,  swagger地址
 * modules: string[],   模块名称
 * template: string,    模版文件
 * dist: string         dist路径,相对于index.js的路径
 */
const config = {
  swaggerUrl: '',
  template: './teaching-service-tmp',
  dist: '../../src/renderer/js/api/'
};

module.exports = config;
