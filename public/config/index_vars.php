<?php
#
# @Author      :  ww1372247148@163.com
# @AuthorDNS   :  wendirong.top
# @CreateTime  :  2023-12-07
# @FilePath    :  index_vars.php
# @FileVersion :  1.0
# @FileDesc    :  index页面的php变量集
#

$WEBSRV_DNS_NAME = 'simple-idaas.myside.com'; // 此站点的访问域名
$API_URI_SCHEME_HOST = "https://api.$WEBSRV_DNS_NAME/"; // 后端站点的访问域名, 可http
$DINGTALK_CORPID = 'your_dingtalk_corpId'; // 从钉钉管理后台获取企业id: corpId

# 允许从钉钉应用内访问此站点, 通过调用后端的 get_dd_UserInfo.php 接口并匹配 pass_users.json 用于匹配钉钉的用户列表
# 允许从Web端访问此站点, 通过php的 $_SERVER['REMOTE_ADDR'] 接口获取用户的源IP并匹配 $pass_iplists 的IP列表 (建议搭建内网环境)
$pass_iplists = ['X.X.X.X'];

$tpl_var_maps = array(
    'main' => ['idaas_t_main', 'getMain', 'main_table_cols'],
    'search_user_data' => ['idaas_t_searchUserData', 'getSearchUserData', 'searchUserData_table_cols'],
    'sync_data' => ['idaas_t_syncData', 'getSyncData', 'syncData_table_cols', 'templet_syncData'],
    'search_assoc_data' => ['idaas_t_searchAssocData', 'getSearchAssocData', 'searchAssocData_table_cols'],
    'sys_audit' => ['idaas_t_sysAudit', 'getSysAudit', 'sysAudit_table_cols']
);
$tpl_text_maps = array(
    'main' => ['首页', 'simple-idaas-main'],
    'search_user_data' => ['查询数据', 'simple-idaas-search'],
    'sync_data' => ['数据同步', 'simple-idaas-sync'],
    'search_assoc_data' => ['数据关联查询', 'simple-idaas-handle'],
    'sys_audit' => ['系统日志', 'simple-idaas-audit']
);
