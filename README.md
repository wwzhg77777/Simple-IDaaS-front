# 简易版IDaaS身份源同步系统，以钉钉为上游同步源，AD域控为下游同步源，通过python的ldap3库实现对AD域控组织架构的增删改查。

## 域名站点、技术栈
 - mysite.com 本地化服务器的主域名
 - simple-idaas.mysite.com 挂载在nginx服务器上的web站点及域名
 - api.simple-idaas.mysite.com 仅处理web站点的api请求数据接口域名

 - js框架使用layui 2.6.8

## 功能模块
 - 首页: AD域控、钉钉通讯录、奇安信天擎、固定资产系统等数据源的统计结果
 - 查询数据: 查询AD域控、钉钉通讯录的实时数据和历史数据
 - 数据同步: 通过定时任务，将上游钉钉通讯录与下游AD域控不匹配的数据过滤到JSON，数据同步页面获取后端的JSON数据，支持对差异的AD域控数据(OU组、域安全组、域用户)进行增删改查
 - 关联查询: 查询AD域控、钉钉通讯录、奇安信天擎、固定资产系统等数据源的关联结果
 - 系统日志: 查看操作过数据同步功能模块的日志审计

## 配置参数
1. 配置 config\global.php 的 $WEBSRV_DNS_NAME  $DINGTALK_CORPID  $pass_iplists