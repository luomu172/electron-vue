/**
 * config.js 配置文件
 * @description
 * @author Whilconn <798490319@qq.com>
 * @date 2018/8/4 0:49
 */
/**
 * @description
 * @type {{
 * swaggerUrl: string,  swagger地址
 * modules: string[],   模块名称
 * template: string,    模版文件
 * dist: string         dist路径,相对于index.js的路径
 * }}
 */
const swagger = {
  url: '',
  host: '',
  port: '',
  group: '',
  domain: ''
};
const swaggerUrl = `${swagger.url}?host=${swagger.host}&port=${swagger.port}&group=${swagger.group}&domain=${swagger.domain}`;
console.log(swaggerUrl);
const config = {
  swaggerUrl,
  template: './teaching-service-tmp',
  dist: '../../src/app/common/service/'
};

module.exports = config;
