/**
 * index.js
 * @description code-bus的入口文件
 * @author Whilconn <798490319@qq.com>
 * @date 2017/6/21 10:29
 */

/**<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< require >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>**/
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const config = require('./config');
const qs = require('qs');
const template = require(config.template);

const UTF8 = 'utf-8';

let requestParams = {};
/**<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< invoke >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>**/
index();

/**<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< declare >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>**/
function index() {
  parseUrl();
  requestSwagger()
    .then(response => {
      genService(response);
    })
    .catch(err => {
      console.log(err);
    });
}

function parseUrl() {
  requestParams = qs.parse(config.swaggerUrl);
  if(!requestParams.group || !requestParams.domain){
    throw Error('请求参数必须包含 group 和 domain');
  }
}

function requestSwagger() {
  const url = config.swaggerUrl;
  return fetch(url).then(res => res.json());
}

function genService(response) {
  const modules = config.modules || [];

  // 处理所有接口
  if (!modules.length) {
    _genService(response);
    return;
  }

  // 处理指定模块接口
  modules.forEach(function(module) {
    _genService(response, module);
  });
}

function _genService(response, module) {
  const METHOD = {
    GET: 'get',
    POST: 'post',
    DELETE: 'delete',
    PATCH: 'patch',
    PUT: 'put'
  };

  const PARAM_TYPE = {
    QUERY: 'query',
    BODY: 'body'
  };

  const tags = new Map();
  Object.keys(response.paths).forEach(field => {
    // get path
    let method = METHOD.GET,
      path = response.paths[field];
    Object.keys(METHOD).forEach(key => {
      const value = METHOD[key];
      value in path && (method = value);
    });
    path = path[method];
    const tag = path.tags[0];

    // gen api bean
    const api = {
      name: path.operationId.replace(/Using.*/g, ''),
      summary: path.summary,
      url: field.replace(/\/tea_api/g, ''),
      paramsType: path.parameters && path.parameters[path.parameters.length - 1].in, // PARAM_TYPE
      method,
      tag
    };

    let apis = tags.get(tag) || [];
    apis.push(api);
    tags.set(tag, apis);
  });

  if (!Object.keys(tags)) return;

  for (var [key, value] of tags) {
    let tag = response.tags.find(tag => key === tag.name);
    // gen code
    const domain = `http://${requestParams.domain}`
    let code = template.render(value, tag, domain);

    // write file
    const group = requestParams.group+'/';
    const dist = path.join(__dirname, config.dist, group);
    mkdirp.sync(dist);
    fs.writeFileSync(`${dist}${key || 'api'}.service.js`, code, UTF8);

    // let code2 = template_2.render(value, tag);
    //
    // // write file
    // const dist2 = path.join(__dirname, config.dist_2);
    // mkdirp.sync(dist2);
    // fs.writeFileSync(`${dist2}${key || 'api'}.service.js`, code2, UTF8);
  }
}
