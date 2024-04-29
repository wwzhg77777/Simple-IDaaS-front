/*
 * @Author      :  ww1372247148@163.com
 * @AuthorDNS   :  wendirong.top
 * @CreateTime  :  2023-12-18
 * @FilePath    :  utils.js
 * @FileVersion :  1.0
 * @FileDesc    :  utils-js函数工具集
*/

function deepClone(source) {
    if (typeof source !== 'object' || source == null) {
      return source;
    }
    const target = Array.isArray(source) ? [] : {};
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (typeof source[key] === 'object' && source[key] !== null) {
          target[key] = deepClone(source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
    return target;
  }