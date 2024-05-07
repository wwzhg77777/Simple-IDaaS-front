<?php
#
# @Author      : ww1372247148@163.com
# @AuthorDNS   : wendirong.top
# @CreateTime  : 2023-12-07
# @FilePath    : components/search_data/templet.php
# @FileVersion : 1.0
# @FileDesc    : compontents的 查询数据 模块的 layui_templet模板引擎
#
?>


<script type="text/html" id="idaas-search-tpl-show-info">
    <button class="btn-select idaas-cls-cell-button padding-8-12" lay-event="show-info">查看</button>
</script>

<script type="text/html" id="idaas-search-tpl-Id">
    <p style="font-family: consolas;font-weight: bolder;">{{ d.Id }}</p>
</script>
<script type="text/html" id="idaas-search-tpl-objGUID">
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
<script type="text/html" id="idaas-search-tpl-type">
    <div class="idaas-cls-cell-base margin-9-5">
        <p>{{ field_tpl_type_maps[d.type] }}</p>
    </div>
</script>

<script type="text/html" id="idaas-search-tpl-cn">
{{# if (d.cn){ }}
    <div class="idaas-cls-cell-base margin-9-5 mouseTips">
        <p data-str="{{ d.cn.replace(/OU=/g,'').replace(/CN=/g,'').split(',').slice(0, -4).reverse().join('/') }}">{{ d.cn.split(',')[0].replace('CN=','') }}</p>
    </div>
    {{# } else { }}
        <div>
            <p> - </p>
        </div>
        {{# } }}
</script>
<script type="text/html" id="idaas-search-tpl-ou">
{{# if (d.ou){ }}
    <div class="idaas-cls-cell-base margin-9-5 idaas-cls-cell-solid-border mouseTips">
        <p class="padding-0-10" data-arr="{{ d.ou }}">{{ d.ou.split(',')[0].replace('OU=','') }}</p>
    </div>
    {{# } else { }}
        <div>
            <p> - </p>
        </div>
        {{# } }}
</script>
<script type="text/html" id="idaas-search-tpl-desc">
    <div class="idaas-cls-cell-base margin-9-5 mouseTips">
        <p data-str="{{# if (d.desc){ }}{{ d.desc }}{{# } }}">{{# if (d.desc){ }}{{ d.desc }}{{# } else { }} - {{# } }}</p>
    </div>
</script>
<script type="text/html" id="idaas-search-tpl-enabled">
{{# if ('enabled' in d){ }}
    <div class="idaas-cls-cell-base margin-9-5">
        <p>{{ d.enabled ? '是' : '否' }}</p>
    </div>
    {{# } else { }}
        <div>
            <p> - </p>
        </div>
        {{# } }}
</script>
<script type="text/html" id="idaas-search-tpl-userName">
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
<script type="text/html" id="idaas-search-tpl-dept">
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
<script type="text/html" id="idaas-search-tpl-position">
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
<script type="text/html" id="idaas-search-tpl-jobNumber">
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
<script type="text/html" id="idaas-search-tpl-email">
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