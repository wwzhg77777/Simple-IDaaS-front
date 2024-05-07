<?php
#
# @Author      :  ww1372247148@163.com
# @AuthorDNS   :  wendirong.top
# @CreateTime  :  2023-12-07
# @FilePath    :  header.php
# @FileVersion :  1.0
# @FileDesc    :  template模板的 header 页头
#
?>

<div class="layui-header idaas-header">
    <div class="layui-logo layui-hide-xs layui-bg-black">
        <span class="logo-text1">IDaaS</span>
        <span class="logo-text2">简易版系统</span=>
    </div>
    <div class="layui-menu">
        <ul class="layui-menu-panel" lay-filter="menu">
            <h3 style="line-height: 60px;color: #fff;font-weight: bold;font-family: consolas;margin-left: 10px;">注意事项: 每日 12:10 和 16:10 自动执行一次数据同步。</h3>
            <li class="layui-menu-panel-item layui-menu-item-checked"><i class="close-icon" onclick="alert('关闭该标签页')"></i>首页</li>
            <li class="layui-menu-panel-item"><i class="close-icon"></i>查询数据</li>
            <li class="layui-menu-panel-item"><i class="close-icon"></i>数据同步</li>
            <li class="layui-menu-panel-item"><i class="close-icon"></i>关联查询</li>
            <li class="layui-menu-panel-item"><i class="close-icon"></i>系统日志</li>
            <li class="layui-menu-panel-item"><i class="close-icon"></i>系统设置</li>
        </ul>
        <div class="layui-menu-avater-panel" lay-filter="avater">
            <?php if (in_array($_REQUEST['map'], ['assoc_data', 'main'])) {
                echo "<button class=\"layui-btn layui-btn-sm tool-temp-button tool-opacity\" style=\"margin-right: 10px;\" onclick=\"syncAssocData(this)\">" . ($_REQUEST['map'] == 'main' ? '刷新页面数据' : '同步关联查询') . "</button>";
            } ?>
            <span onclick="alert('用户详情页')">
                <p class="dingtalk-info-name">用户名称</p>
                <i class="user-more-icon"></i>
            </span>
            <img class="dingtalk-info-avatar" src="imgs/wxqrcode.png" alt="img">
        </div>
    </div>
</div>