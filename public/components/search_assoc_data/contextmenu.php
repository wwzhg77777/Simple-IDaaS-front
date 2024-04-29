<?php
#
# @Author      :  ww1372247148@163.com
# @AuthorDNS   :  wendirong.top
# @CreateTime  :  2024-02-26
# @FilePath    :  components/search_assoc_data/comtextmenu.php
# @FileVersion :  1.0
# @FileDesc    :  template模板的 contextmenu 右键菜单
#
?>

<div id="mouseMenu" class="layui-dropdown layui-border-box layui-panel layui-anim layui-anim-downbit" style="display: none; width: 270px;">
    <ul data-type="flow" id="menuFlow" class="layui-menu layui-dropdown-menu">
        <li data-ignore="1">
            <div class="layui-menu-body-title" data-str="没有电脑使用需求">设置忽略：没有电脑使用需求</div>
        </li>
        <li data-ignore="1">
            <div class="layui-menu-body-title" data-str="MacOS电脑在用">设置忽略：MacOS电脑在用</div>
        </li>
        <li data-ignore="1">
            <div class="layui-menu-body-title" data-str="存在天擎终端但未上线">设置忽略：存在天擎终端但未上线</div>
        </li>
        <li data-ignore="1">
            <div class="layui-menu-body-title" data-str="员工离职">设置忽略：员工离职</div>
        </li>
        <li data-ignore="1">
            <div class="layui-menu-body-title" data-str="网安IT人员关联多资产">设置忽略：网安IT人员关联多资产</div>
        </li>
        <li class="layui-menu-item-divider"></li>
        <li data-ignore="0">
            <div class="layui-menu-body-title" data-str>从忽略列表移出</div>
        </li>
    </ul>
    <ul data-type="tq" id="menuAssoc_tq" class="layui-menu layui-dropdown-menu">
        <li data-ignore="1">
            <div class="layui-menu-body-title" data-str="绑定关联资产编号">忽略错误信息：绑定关联资产编号</div>
        </li>
        <li data-ignore="1">
            <div class="layui-menu-body-title" data-str="员工个人电脑">忽略错误信息：员工个人电脑</div>
        </li>
        <li class="layui-menu-item-divider"></li>
        <li data-ignore="0">
            <div class="layui-menu-body-title" data-str>从忽略列表移出</div>
        </li>
    </ul>
    <ul data-type="itasset" id="menuAssoc_itasset" class="layui-menu layui-dropdown-menu">
        <li data-ignore="1">
            <div class="layui-menu-body-title" data-str="存在天擎终端但未上线">忽略错误信息：存在天擎终端但未上线</div>
        </li>
        <li data-ignore="1">
            <div class="layui-menu-body-title" data-str="无需安装天擎终端">忽略错误信息：无需安装天擎终端</div>
        </li>
        <li class="layui-menu-item-divider"></li>
        <li data-ignore="0">
            <div class="layui-menu-body-title" data-str>从忽略列表移出</div>
        </li>
    </ul>
</div>