<?php
#
# @Author      :  ww1372247148@163.com
# @AuthorDNS   :  wendirong.top
# @CreateTime  :  2023-12-14
# @FilePath    :  forms.php
# @FileVersion :  1.0
# @FileDesc    :  template模板的 forms 表单
#
?>

<form class="layui-form" action="" id="frm_show_info" lay-filter="frmShowInfo" style="display: none;width: 700px;">
    <div class="idaas-cls-frm">
        <div class="idaas-cls-frm-item">
            <label class="idaas-cls-frm-item-label">objectGUID</label>
            <div class="idaas-cls-frm-block">
                <input type="text" name="show_objGUID" autocomplete="off" readonly class="layui-input">
            </div>
        </div>
        <div class="idaas-cls-frm-item">
            <label class="idaas-cls-frm-item-label">域用户(cn)</label>
            <div class="idaas-cls-frm-block">
                <textarea name="show_cn" autocomplete="off" readonly class="layui-textarea"></textarea>
            </div>
        </div>
        <div class="idaas-cls-frm-item">
            <label class="idaas-cls-frm-item-label">域OU组</label>
            <div class="idaas-cls-frm-block">
                <textarea name="show_ou" autocomplete="off" readonly class="layui-textarea"></textarea>
            </div>
        </div>
        <div class="idaas-cls-frm-item">
            <label class="idaas-cls-frm-item-label">域安全组</label>
            <div class="idaas-cls-frm-block">
                <textarea name="show_secgroup" autocomplete="off" readonly class="layui-textarea"></textarea>
            </div>
        </div>
        <div class="idaas-cls-frm-item">
            <label class="idaas-cls-frm-item-label">描述</label>
            <div class="idaas-cls-frm-block">
                <textarea name="show_desc" autocomplete="off" readonly class="layui-textarea"></textarea>
            </div>
        </div>
        <div class="idaas-cls-frm-item">
            <label class="idaas-cls-frm-item-label">是否启用</label>
            <div class="idaas-cls-frm-block">
                <input type="text" name="show_enabled" autocomplete="off" readonly class="layui-input">
            </div>
        </div>
        <div class="idaas-cls-frm-item idaas-cls-frm-spec-field">
            <label class="idaas-cls-frm-item-label">显示名称(displayName)</label>
            <div class="idaas-cls-frm-block">
                <input type="text" name="show_displayName" autocomplete="off" readonly class="layui-input">
            </div>
        </div>
        <div class="idaas-cls-frm-item idaas-cls-frm-spec-field">
            <label class="idaas-cls-frm-item-label">登录名(upn)</label>
            <div class="idaas-cls-frm-block">
                <input type="text" name="show_upn" autocomplete="off" readonly class="layui-input">
            </div>
        </div>
        <div class="idaas-cls-frm-item idaas-cls-frm-spec-field">
            <label class="idaas-cls-frm-item-label">登录名(samid)</label>
            <div class="idaas-cls-frm-block">
                <input type="text" name="show_samid" autocomplete="off" readonly class="layui-input">
            </div>
        </div>
        <div class="idaas-cls-frm-item idaas-cls-frm-spec-field">
            <label class="idaas-cls-frm-item-label">邮箱地址(mail)</label>
            <div class="idaas-cls-frm-block">
                <input type="text" name="show_ad_mail" autocomplete="off" readonly class="layui-input">
            </div>
        </div>
        <div class="idaas-cls-frm-item">
            <label class="idaas-cls-frm-item-label">姓名(userName)</label>
            <div class="idaas-cls-frm-block">
                <input type="text" name="show_userName" autocomplete="off" readonly class="layui-input">
            </div>
        </div>
        <div class="idaas-cls-frm-item">
            <label class="idaas-cls-frm-item-label">部门</label>
            <div class="idaas-cls-frm-block">
                <textarea name="show_dept" autocomplete="off" readonly class="layui-textarea"></textarea>
            </div>
        </div>
        <div class="idaas-cls-frm-item">
            <label class="idaas-cls-frm-item-label">职位</label>
            <div class="idaas-cls-frm-block">
                <input type="text" name="show_position" autocomplete="off" readonly class="layui-input">
            </div>
        </div>
        <div class="idaas-cls-frm-item">
            <label class="idaas-cls-frm-item-label">工号</label>
            <div class="idaas-cls-frm-block">
                <input type="text" name="show_jobNumber" autocomplete="off" readonly class="layui-input">
            </div>
        </div>
        <div class="idaas-cls-frm-item">
            <label class="idaas-cls-frm-item-label">企业邮箱</label>
            <div class="idaas-cls-frm-block">
                <input type="text" name="show_dd_email" autocomplete="off" readonly class="layui-input">
            </div>
        </div>
    </div>
</form>


<form class="layui-form" action="" id="frm_update_row" lay-filter="frmUpdateRow" style="display: none;width: 700px;">
    <div class="idaas-cls-frm">
        <div class="idaas-cls-frm-item">
            <label class="idaas-cls-frm-item-label frm-readonly">objectGUID</label>
            <div class="idaas-cls-frm-block">
                <input type="text" name="domain_objGUID" autocomplete="off" readonly class="layui-input frm-readonly">
            </div>
        </div>
        <div class="idaas-cls-frm-item">
            <label class="idaas-cls-frm-item-label frm-readonly">域用户(cn)</label>
            <div class="idaas-cls-frm-block">
                <textarea name="domain_cn" autocomplete="off" readonly class="layui-textarea frm-readonly"></textarea>
            </div>
        </div>
        <div class="idaas-cls-frm-item">
            <label class="idaas-cls-frm-item-label frm-readonly">域OU组</label>
            <div class="idaas-cls-frm-block">
                <textarea name="domain_ou" autocomplete="off" readonly class="layui-textarea frm-readonly"></textarea>
            </div>
        </div>
        <div class="idaas-cls-frm-item">
            <label class="idaas-cls-frm-item-label frm-readonly">域安全组</label>
            <div class="idaas-cls-frm-block">
                <textarea name="domain_secgroup" autocomplete="off" readonly class="layui-textarea frm-readonly"></textarea>
            </div>
        </div>
        <div class="idaas-cls-frm-item">
            <label class="idaas-cls-frm-item-label frm-allowedit">描述</label>
            <div class="idaas-cls-frm-block">
                <textarea name="domain_desc" autocomplete="off" class="layui-textarea"></textarea>
            </div>
        </div>
        <div class="idaas-cls-frm-item">
            <label class="idaas-cls-frm-item-label frm-readonly">是否启用</label>
            <div class="idaas-cls-frm-block">
                <input type="text" name="domain_enabled" autocomplete="off" readonly class="layui-input frm-readonly">
            </div>
        </div>
        <div class="idaas-cls-frm-item">
            <label class="idaas-cls-frm-item-label frm-readonly">姓名(userName)</label>
            <div class="idaas-cls-frm-block">
                <input type="text" name="ding_userName" autocomplete="off" readonly class="layui-input frm-readonly">
            </div>
        </div>
        <div class="idaas-cls-frm-item">
            <label class="idaas-cls-frm-item-label frm-readonly">部门</label>
            <div class="idaas-cls-frm-block">
                <textarea name="ding_dept" autocomplete="off" readonly class="layui-textarea frm-readonly"></textarea>
            </div>
        </div>
        <div class="idaas-cls-frm-item">
            <label class="idaas-cls-frm-item-label frm-readonly">职位</label>
            <div class="idaas-cls-frm-block">
                <input type="text" name="ding_position" autocomplete="off" readonly class="layui-input frm-readonly">
            </div>
        </div>
        <div class="idaas-cls-frm-footer">
            <div class="idaas-cls-frm-block">
                <button type="button" class="layui-btn layui-btn-primary" lay-on="frmUpdateReset">重置</button>
                <button lay-submit class="layui-btn" lay-filter="frmUpdateSubmit">立即修改</button>
            </div>
        </div>
    </div>
</form>