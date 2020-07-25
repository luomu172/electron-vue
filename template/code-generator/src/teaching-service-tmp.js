/**
 * teaching-service-tmp.js
 * @description 教学项目service模版文件
 * @author Whilconn <798490319@qq.com>
 * @date 2018/8/4 0:48
 */
function renderApiList(apiList) {
  return apiList.map(api => {
    return `
        ${api.name}: COMMON.API_URL + '${api.url}',`;
  });
}

function renderApiFuncList(apiList) {
  const METHOD = {
    GET: 'get',
    POST: 'post',
    DELETE: 'delete',
    PATCH: 'patch',
    PUT: 'put'
  };

  const PARAM_TYPE = {
    QUERY: 'query',
    BODY: 'body',
    FORM_DATA: 'formData'
  };

  return apiList.map(api => {
    let method = api.method;
    if (method === METHOD.POST) {
      if (api.paramsType === PARAM_TYPE.QUERY) {
        method = 'postForm';
      } else if (api.paramsType === PARAM_TYPE.FORM_DATA) {
        method = 'postUpload';
      }
    } else if (method === METHOD.PATCH) {
      if (api.paramsType === PARAM_TYPE.QUERY) {
        method = 'patchForm';
      }
    } else if (method === METHOD.PUT) {
      if (api.paramsType === PARAM_TYPE.QUERY) {
        method = 'putForm';
      }
    }

    return `
  // ${api.summary}
  static async ${api.name}(params={}) {
      const data = await HttpService.${method}(domain + '${api.url}', params);
      return data;
  }
        `;
  });
}

/**
 * 单词首字母大写
 * @param name
 * @returns {string}
 */
function uw(name) {
  let uw = name.replace(/\b\w+\b/g, function(word) {
    return word.substring(0, 1).toUpperCase() + word.substring(1);
  });
  return uw.split('-').join('');
}

function render(apiList, tag, domain) {
  return `
/**
 * 此代码是由 code-generator 项目生成,详情请看 code-generator/README.md
 */
import {HttpService} from '../httpService';

const domain = HttpService.getOrigin('${domain}')

/**
 * ${tag.description}
 */
export class ${uw(tag.name)}Service {

  ${renderApiFuncList(apiList).join('')}
}
    `;
}

module.exports = {
  render
};
