<?php
#
# @Author      :  ww1372247148@163.com
# @AuthorDNS   :  wendirong.top
# @CreateTime  :  2023-12-07
# @FilePath    :  config/index.php
# @FileVersion :  1.0
# @FileDesc    :  index页面的php变量集
#

$tpl_var_maps = array(
    'main' => ['idaas_t_main', 'getMain', 'main_table_cols'],
    'search_data' => ['idaas_t_searchData', 'getSearchData', 'searchData_table_cols'],
    'sync_data' => ['idaas_t_syncData', 'getSyncData', 'syncData_table_cols'],
    'assoc_data' => ['idaas_t_assocData', 'getAssocData', 'assocData_table_cols'],
    'sys_audit' => ['idaas_t_sysAudit', 'getSysAudit', 'sysAudit_table_cols']
);
$tpl_text_maps = array(
    'main' => ['首页', 'simple-idaas-main'],
    'search_data' => ['查询数据', 'simple-idaas-search'],
    'sync_data' => ['数据同步', 'simple-idaas-sync'],
    'assoc_data' => ['关联查询', 'simple-idaas-handle'],
    'sys_audit' => ['系统日志', 'simple-idaas-audit']
);
