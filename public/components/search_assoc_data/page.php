<?php
#
# @Author      : ww1372247148@163.com
# @AuthorDNS   : wendirong.top
# @CreateTime  : 2024-02-15
# @FilePath    : components/search_assoc_data/page.php
# @FileVersion : 1.0
# @FileDesc    : compontents的 数据关联查询 的 页面
#
?>

<div id="body_main" class="page-assoc-main div-flex" style="display: none;">
    <div class="assoc-dingtalk-dept">
        <div class="dept-title div-flex">
            <span>钉钉通讯录 - 分组</span>
        </div>
        <div class="dept-content">
            <div class="search div-flex" style="display: none;">
                <div class="search-wrap div-flex">
                    <input class="search-input-area" placeholder="搜索分组名称" oninput="searchChange(this)" onkeydown="searchKeydown(this,event)">
                    <span>
                        <i><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="16.470703125" height="16" viewBox="0 0 16.470703125 16">
                                <g>
                                    <path d="M11.0744,9.656L16.4212,14.85C16.4871,14.914,16.4871,15.018,16.4212,15.082L15.5235,15.952C15.4576,16.016,15.3506,16.016,15.2847,15.952L9.93794,10.76C8.86529,11.564,7.55588,12,6.17647,12C4.52529,12,2.975,11.376,1.80971,10.242C0.644412,9.11,0,7.602,0,6C0,4.396,0.642353,2.89,1.80971,1.758C2.975,0.626,4.52735,0,6.17647,0C7.82559,0,9.37794,0.624,10.5432,1.758C11.7085,2.892,12.3529,4.396,12.3529,6C12.3529,7.34,11.9041,8.614,11.0744,9.656ZM6.17622,10.48C7.40739,10.48,8.56445,10.014,9.4374,9.16802C10.3083,8.32202,10.788,7.19602,10.788,6.00002C10.788,4.80402,10.3083,3.68002,9.4374,2.83202C8.56651,1.98402,7.40739,1.52002,6.17622,1.52002C4.94504,1.52002,3.78798,1.98602,2.91504,2.83202C2.04416,3.67802,1.56445,4.80402,1.56445,6.00002C1.56445,7.19602,2.04416,8.32002,2.91504,9.16802C3.78798,10.014,4.94504,10.48,6.17622,10.48Z" fill-rule="evenodd" fill="#666666" fill-opacity="1" />
                                </g>
                            </svg></i>
                    </span>
                </div>
            </div>
            <div class="dept-list-tree" id="deptListTree"></div>
        </div>
    </div>
    <div class="assoc-dingtalk-user" style="width: 640px;">
        <div class="user-title div-flex">
            <span>钉钉通讯录 - 用户列表</span>
        </div>
        <div class="user-content">
            <div id="navLink" class="nav-link div-flex"></div>
            <div class="user-list">
                <ul id="userListFlow" class="user-list-flow"></ul>
            </div>
        </div>
    </div>
    <div class="assoc-panel">
        <div class="panel-title div-flex">
            <span>数据关联 - 钉钉&域控&天擎&固定资产</span>
        </div>
        <div id="userListAssoc" class="panel-content">
            <div class="layui-collapse">
                <div class="layui-colla-item">
                    <h2 class="layui-colla-title">钉钉数据 & 域控数据</h2>
                    <div class="layui-colla-content colla-wrap-list layui-show">
                        <div id="dd_info" class="layui-colla-item" style="width: 320px;margin-right: 5px;">
                        </div>
                        <div id="ad_info" class="layui-colla-item" style="width: 450px;">
                        </div>
                    </div>
                </div>
                <div class="layui-colla-item">
                    <h2 class="layui-colla-title">天擎数据</h2>
                    <div id="tq_list" class="layui-colla-content colla-wrap-list layui-show">
                    </div>
                </div>
                <div class="layui-colla-item">
                    <h2 class="layui-colla-title">固定资产数据</h2>
                    <div id="itasset_list" class="layui-colla-content colla-wrap-list layui-show">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>