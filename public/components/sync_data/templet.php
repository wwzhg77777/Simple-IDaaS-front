<?php
#
# @Author      : ww1372247148@163.com
# @AuthorDNS   : wendirong.top
# @CreateTime  : 2023-12-07
# @FilePath    : components/sync_data/templet.php
# @FileVersion : 1.0
# @FileDesc    : compontents的 数据同步 模块的 layui_templet模板引擎
#
?>

<script type="text/html" id="idaas-sync-tpl-show-info">
    <button class="{{# if(d.method == 'update user'){ }}btn-update{{# } else { }}btn-select{{# } }} idaas-cls-cell-button padding-8-12" lay-event="show-info">查看</button>
</script>
<script type="text/html" id="idaas-sync-tpl-action">
    <div class="idaas-cls-cell-radio" data-action="{{ d.action }}">
        <span class="idaas-cls-cell-radio-span {{ [-1, 0].includes(d.action) ? '' : 'radio-checked' }}" lay-event="action-confirm">
            <i class="layui-icon {{ [-1, 0].includes(d.action) ? 'layui-icon-circle' : 'layui-icon-radio' }}"></i>
            <p class="idaas-cls-cell-radio-text">确认</p>
        </span>
        <span class="idaas-cls-cell-radio-span {{ [-1, 1].includes(d.action) ? '' : 'radio-checked' }}" lay-event="action-defer">
            <i class="layui-icon {{ [-1, 1].includes(d.action) ? 'layui-icon-circle' : 'layui-icon-radio' }}"></i>
            <p class="idaas-cls-cell-radio-text">暂缓</p>
        </span>
        <span class="idaas-cls-cell-radio-span" style="width: 30%;" lay-event="action-ignore">
            <p class="idaas-cls-cell-radio-text ignore-text" style="color: #FF0000;">忽略</p>
        </span>
    </div>
</script>
<script type="text/html" id="idaas-sync-tpl-update-row">
{{# if (['insert', 'update'].includes(d.method.split(' ')[0])){ }}
    <button class="btn-update idaas-cls-cell-button padding-8-20" lay-event="update-row">编辑信息</button>
    {{# } }}
</script>

<script type="text/html" id="idaas-sync-tpl-Id">
    <p style="font-family: consolas;font-weight: bolder;">{{ d.Id }}</p>
</script>
<script type="text/html" id="idaas-sync-tpl-objGUID">
{{# if (d.objGUID){ }}
    <div class="idaas-cls-cell-base margin-9-5 mouseTips">
        <p data-str="{{ d.objGUID }}" style="font-family: consolas;">{{ d.objGUID }}</p>
    </div>
    {{# } else { }}
        <div>
            <p> - </p>
        </div>
        {{# } }}
</script>
<script type="text/html" id="idaas-sync-tpl-type">
    <div class="idaas-cls-cell-base margin-9-5">
        <p>{{ field_tpl_type_maps[d.type] }}</p>
    </div>
</script>
<script type="text/html" id="idaas-sync-tpl-method">
    <div class="idaas-cls-cell-base margin-9-5">
        <p class="idaas-cls-cell-fill-border padding-0-10 color-fff bg-{{ field_tpl_method_var_maps[d.method][1] }}">{{ field_tpl_method_var_maps[d.method][0] }}</p>
    </div>
</script>

<script type="text/html" id="idaas-sync-tpl-cn">
{{# if (d.cn){ }}
    <div class="idaas-cls-cell-base margin-9-5 mouseTips">
        {{# if(field_tpl_method_var_maps[d.method][2] && field_tpl_method_var_maps[d.method][2] != 'normal'){ }}
            <p class="padding-0-5-0-30 text-left color-{{ field_tpl_method_var_maps[d.method][2] }}" data-str="{{ d.cn.replace(/OU=/g,'').replace(/CN=/g,'').split(',').slice(0, -4).reverse().join('/') }}">{{ d.cn.split(',')[0].replace('CN=','') }}</p>
            <i class="idaas-cls-img-base idaas-cls-img-{{ field_tpl_method_var_maps[d.method][2] }}"></i>
            {{# } else { }}
                <p data-str="{{ d.cn.replace(/OU=/g,'').replace(/CN=/g,'').split(',').slice(0, -4).reverse().join('/') }}">{{ d.cn.split(',')[0].replace('CN=','') }}</p>
                {{# } }}
    </div>
    {{# } else { }}
        <div>
            <p> - </p>
        </div>
        {{# } }}
</script>
<script type="text/html" id="idaas-sync-tpl-ou">
{{# if (d.ou){ }}
    <div class="idaas-cls-cell-base margin-9-5 idaas-cls-cell-solid-border mouseTips">
        {{# if(field_tpl_method_var_maps[d.method][3] && field_tpl_method_var_maps[d.method][3] != 'normal'){ }}
            <p class="padding-0-5-0-30 text-left color-{{ field_tpl_method_var_maps[d.method][3] }}" data-arr="{{ d.ou }}">{{ d.ou.split(',')[0].replace('OU=','') }}</p>
            <i class="idaas-cls-img-base idaas-cls-img-{{ field_tpl_method_var_maps[d.method][3] }}"></i>
            {{# } else { }}
                <p class="padding-0-10" data-arr="{{ d.ou }}">{{ d.ou.split(',')[0].replace('OU=','') }}</p>
                {{# } }}
    </div>
    {{# } else { }}
        <div>
            <p> - </p>
        </div>
        {{# } }}
</script>
<script type="text/html" id="idaas-sync-tpl-secgroup">
{{# if (d.secgroup){ }}
    <div class="idaas-cls-cell-base margin-9-5 idaas-cls-cell-solid-border mouseTips">
        {{# if(field_tpl_method_var_maps[d.method][4] && field_tpl_method_var_maps[d.method][4] != 'normal'){ }}
            <p class="padding-0-5-0-30 text-left color-{{ field_tpl_method_var_maps[d.method][4] }}" data-arr="{{ d.secgroup }}">{{ d.secgroup.split(',')[0].replace('CN=','') }}</p>
            <i class="idaas-cls-img-base idaas-cls-img-{{ field_tpl_method_var_maps[d.method][4] }}"></i>
            {{# } else { }}
                <p class="padding-0-10" data-arr="{{ d.secgroup }}">{{ d.secgroup.split(',')[0].replace('CN=','') }}</p>
                {{# } }}
    </div>
    {{# } else { }}
        <div>
            <p> - </p>
        </div>
        {{# } }}
</script>
<script type="text/html" id="idaas-sync-tpl-desc">
    <div class="idaas-cls-cell-base margin-9-5 mouseTips">
        {{# if(d.method == 'update user'){ }}
            <p class="padding-0-5-0-30 text-left color-update" data-str="{{ d.desc }}">{{ d.desc }}</p>
            <i class="idaas-cls-img-base idaas-cls-img-update"></i>
            {{# } else { }}
                <p data-str="{{# if (d.desc){ }}{{ d.desc }}{{# } }}">{{# if (d.desc){ }}{{ d.desc }}{{# } else { }} - {{# } }}</p>
                {{# } }}
    </div>
</script>
<script type="text/html" id="idaas-sync-tpl-enabled">
{{# if ('enabled' in d){ }}
    <div class="idaas-cls-cell-base margin-9-5">
        {{# if(d.method == 'insert user'){ }}
            <p class="padding-0-5-0-30 text-left color-insert">{{ d.enabled ? '是' : '否' }}</p>
            <i class="idaas-cls-img-base idaas-cls-img-insert"></i>
            {{# } else if(d.method == 'disable user') { }}
                <p class="padding-0-5-0-30 text-left color-delete">{{ d.enabled ? '是' : '否' }}</p>
                <i class="idaas-cls-img-base idaas-cls-img-delete"></i>
                {{# } else { }}
                    <p>{{ d.enabled ? '是' : '否' }}</p>
                    {{# } }}
    </div>
    {{# } else { }}
        <div>
            <p> - </p>
        </div>
        {{# } }}
</script>
<script type="text/html" id="idaas-sync-tpl-userName">
{{# if (d.userName){ }}
    <div class="idaas-cls-cell-base margin-9-5 mouseTips">
        <p data-str="{{ d.dept.split('\n').map(x => x + '/' + d.userName ).join('\n') }}">{{ d.userName }}</p>
    </div>
    {{# } else { }}
        <div>
            <p> - </p>
        </div>
        {{# } }}
</script>
<script type="text/html" id="idaas-sync-tpl-dept">
{{# if (d.dept){ }}
    <div class="idaas-cls-cell-base margin-9-5 mouseTips">
        <p data-str="{{ d.dept }}">{{ d.dept.split('\n')[0].split('/')[d.dept.split('\n')[0].split('/').length - 1] }}</p>
    </div>
    {{# } else { }}
        <div>
            <p> - </p>
        </div>
        {{# } }}
</script>
<script type="text/html" id="idaas-sync-tpl-position">
{{# if (d.position){ }}
    <div class="idaas-cls-cell-base margin-9-5">
        <p>{{ d.position }}</p>
    </div>
    {{# } else { }}
        <div>
            <p> - </p>
        </div>
        {{# } }}
</script>
<script type="text/html" id="idaas-sync-tpl-jobNumber">
{{# if (d.jobNumber){ }}
    <div class="idaas-cls-cell-base margin-9-5">
        <p>{{ d.jobNumber }}</p>
    </div>
    {{# } else { }}
        <div>
            <p> - </p>
        </div>
        {{# } }}
</script>
<script type="text/html" id="idaas-sync-tpl-email">
{{# if (d.email){ }}
    <div class="idaas-cls-cell-base margin-9-5 mouseTips">
        <p data-str="{{ d.email }}">{{ d.email }}</p>
    </div>
    {{# } else { }}
        <div>
            <p> - </p>
        </div>
        {{# } }}
</script>