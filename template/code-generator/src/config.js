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
const config = {
  swaggerUrl: 'http://teaching-swagger-service-test.c34a2fa211afc47939399469144eee06c.cn-shenzhen.alicontainer.com/load-api-docs?host=172.20.1.10&port=8080&group=teaching-question-query-service&domain=test-tapi-question-query.xiaojiaoyu100.com',
  template: './teaching-service-tmp',
  dist: '../../src/renderer/js/api/'
};

module.exports = config;
