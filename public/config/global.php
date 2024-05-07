<?php
#
# @Author      :  ww1372247148@163.com
# @AuthorDNS   :  wendirong.top
# @CreateTime  :  2023-12-07
# @FilePath    :  config/global.php
# @FileVersion :  1.0
# @FileDesc    :  全局的php变量集
#

$WEBSRV_DNS_NAME = 'simple-idaas.myside.com'; // 此站点的访问域名
$API_URI_SCHEME_HOST = "https://api.$WEBSRV_DNS_NAME"; // 后端站点的访问域名, 可http
$DINGTALK_CORPID = 'your_dingtalk_corpId'; // 从钉钉管理后台获取企业id: corpId

# 允许从钉钉应用内访问此站点, 通过调用后端的 get_dd_UserInfo.php 接口并匹配 pass_users.json 用于匹配钉钉的用户列表
# 允许从Web端访问此站点, 通过php的 $_SERVER['REMOTE_ADDR'] 接口获取用户的源IP并匹配 $pass_iplists 的IP列表 (建议搭建内网环境)
$pass_iplists = ['X.X.X.X'];
