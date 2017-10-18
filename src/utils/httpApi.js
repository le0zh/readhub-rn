import logger from '../utils/logger';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  options = options || {};

  let queryObj = {};
  if (options.params) {
    queryObj = options.params;
    delete options.params;
  }

  if (Object.keys(queryObj).length) {
    let paramsStr = '';
    let paramsArr = [];
    Object.keys(queryObj).forEach(function (key) {
      if (queryObj[key] != undefined) {
        paramsArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(queryObj[key]));
      }
    });

    paramsStr = paramsArr.join('&').replace(/%20/g, '+');

    if (url.indexOf('?') > -1) {
      url += '&' + paramsStr;
    } else {
      url += '?' + paramsStr;
    }
  }

  logger.log(url);

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(function(data) {
      if (data.code === 2) {
        return {
          code: 2,
          message: '请先登录',
        };
      } else {
        return data;
      }
    })
    .catch(function(e) {
      console.error(e);
      return {
        code: 3,
        message: '接口发生错误',
      };
    });
}
