/*
 * @Author      :  ww1372247148@163.com
 * @AuthorDNS   :  wendirong.top
 * @CreateTime  :  2023-03-14
 * @FilePath    :  api.js
 * @FileVersion :  1.0
 * @FileDesc    :  提供调用后端的api函数集, 实现前后端分离
*/

/**
 *
 * @param {string} url
 * @param {object} params
 * @returns
 */
function ApiGet(url, params) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${API_URI_SCHEME_HOST}${url}`,
            method: 'GET',
            data: params,
            success: (response) => {
                resolve(response);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                reject(new Error('Error: ' + textStatus + ' ' + errorThrown));
            }
        });
    });
}

/**
 *
 * @param {string} url
 * @param {object} data
 * @returns
 */
function ApiPost(url, data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${API_URI_SCHEME_HOST}${url}`,
            method: 'POST',
            data: data,
            dataType: 'json',
            success: (response) => {
                resolve(response);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                reject(new Error('Error: ' + textStatus + ' ' + errorThrown));
            }
        });
    });
}
