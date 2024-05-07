/*
 * @Author      :  ww1372247148@163.com
 * @AuthorDNS   :  wendirong.top
 * @CreateTime  :  2023-03-14
 * @FilePath    :  dd_login.js
 * @FileVersion :  1.0
 * @FileDesc    :  钉钉免密认证的js函数集
*/

function dd_login_token(_dingtalk_corpId) {
    return new Promise(resolve => {
        // Dingtalk获取免密code
        dd.runtime.permission.requestAuthCode({
            corpId: _dingtalk_corpId,
            onSuccess: (info) => {
                if (isDebug) console.log('get corpId code:', info.code);
                if (isDebug) console.log('uri_scheme_host:', _uri_scheme_host);
                // 请求后端获取Dingtalk的access_token
                ApiGet('/getToken.php', {
                    mode: 'getToken'
                }).then((res) => {
                    if (res.code == 200) {
                        if (isDebug) console.log('get token:', res.access_token);
                        resolve({
                            code: info.code,
                            access_token: res.access_token
                        });
                    } else {
                        resolve(false);
                    }
                }).catch(() => {
                    resolve(false);
                });
            },
            onFail: () => {
                resolve(false);
            }
        });
    });
};

function get_dd_userinfo(_code, _access_token) {
    return new Promise(resolve => {
        // 通过免密code和access_token获取当前钉钉用户的信息(userid)
        ApiGet('/get_dd_UserInfo.php', {
            access_token: _access_token,
            code: _code
        }).then((u) => {
            resolve({
                code: u.code,
                info: { name: u.data.name, userid: u.data.userid }
            });
        }).catch(() => {
            resolve(false);
        });
    });
}

function dd_onload(dingtalk_corpId_) {
    return new Promise(async resolve => {
        if (isDebug) console.log('start dingtalk login.');
        let ret_token = await dd_login_token(dingtalk_corpId_);
        if (ret_token) {
            if (isDebug) console.log('ret_token:', ret_token);
            let ret_userinfo = await get_dd_userinfo(ret_token.code, ret_token.access_token);
            if (ret_userinfo) {
                if (isDebug) console.log('ret_userinfo:', ret_userinfo);
                if (ret_userinfo.code == 200) {
                    if (isDebug) console.log(`dingtalk auth success. get name:${ret_userinfo.info.name}, get userid:${ret_userinfo.info.userid}`);// 认证成功，访问网页
                    resolve({
                        auth: true,
                        code: 200,
                        msg: 'success',
                        name: ret_userinfo.info.name,
                        userid: ret_userinfo.info.userid
                    });
                } else if (ret_userinfo.code == 4001042) {
                    if (isDebug) console.log(`dingtalk auth fail. get name:${ret_userinfo.info.name}, get userid:${ret_userinfo.info.userid}`);
                    resolve({
                        auth: false,
                        code: 4001042,
                        msg: '用户无访问权限',
                        name: ret_userinfo.info.name,
                        userid: ret_userinfo.info.userid
                    });
                }
                else {
                    if (isDebug) console.log('001.001 dingtalk auth error.');
                    resolve({
                        auth: false,
                        code: ret_userinfo.code,
                        msg: '001.001 error'
                    });
                }
            } else {
                if (isDebug) console.log('001.002 dingtalk ret_userinfo: ', ret_userinfo);
                resolve({
                    auth: false,
                    code: 500,
                    msg: '001.002 error'
                });
            }
        } else {
            if (isDebug) console.log('001.003 dingtalk ret_token: ', ret_token);
            resolve({
                auth: false,
                code: 500,
                msg: '001.003 error'
            });
        }
    });
}