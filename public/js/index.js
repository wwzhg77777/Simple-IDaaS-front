/*
 * @Author      :  ww1372247148@163.com
 * @AuthorDNS   :  wendirong.top
 * @CreateTime  :  2023-03-15
 * @FilePath    :  index.js
 * @FileVersion :  1.1
 * @FileDesc    :  index页面js函数集
*/

var baseData = {};
var layForm;
var retDingtalkAuth;

const scale_maps = {
    '首页': '首页',
    '查询数据': '查询',
    '数据同步': '同步',
    '关联查询': '关联',
    '系统日志': '日志',
};
const field_tpl_type_maps = {
    'ou': 'OU组',
    'user': '域用户',
    'secgroup': '安全组',
    'dduser': '钉钉用户',
    'dddept': '钉钉部门'
};
const field_tpl_method_var_maps = {
    'insert ou': ['新增 域OU组', 'insert', '', 'insert', ''],
    'delete ou': ['删除 域OU组', 'delete', '', 'delete', 'normal'],
    'update ou': ['修改 域OU组', 'update', '', 'update', ''],
    'transfer ou': ['域OU组迁移部门', 'update', '', 'update', ''],
    'insert secgroup': ['新增 域安全组', 'insert', '', 'normal', 'insert'],
    'delete secgroup': ['删除 域安全组', 'delete', '', '', 'delete'],
    'update secgroup': ['修改 域安全组', 'update', 'normal', 'normal', 'update'],
    'insert user': ['新增 域用户', 'insert', 'insert', 'update', ''],
    'disable user': ['禁用 域用户', 'delete', 'normal', 'normal', 'normal'],
    'remove user': ['迁移 域用户', 'delete', 'delete', 'update', 'update'],
    'update user': ['修改 域用户', 'update', 'update', 'normal', 'update'],
    'transfer user': ['域用户迁移部门', 'update', 'normal', 'update', 'normal'],
};

const ADcolMaps = {
    objGUID: '域控 - ObjectGUID',
    type: '域控 - 类型',
    cn: '域控 - 域用户',
    ou: '域控 - 域OU组',
    desc: '域控 - 描述'
};
const DDcolMaps = {
    userName: '钉钉 - 姓名',
    dept: '钉钉 - 部门',
    position: '钉钉 - 职位',
    jobNumber: '钉钉 - 工号',
    email: '钉钉 - 企业邮箱'
};

function pageAddCount(tableId) {
    let table = layui.table;
    let checkStatus = table.checkStatus(tableId);
    let doSelectDom = document.createElement('span');
    doSelectDom.id = 'idaas-dom-selectRows';
    doSelectDom.innerText = `当前已选择 ${checkStatus['data'].length} 行`;
    $('.layui-box.layui-laypage.layui-laypage-default').append(doSelectDom);
}

function scale_lnav() {
    if ($('.hamburger-container svg')[0].className.baseVal.indexOf('is-active') == -1) {
        $('.hamburger-container svg').attr('class', 'icon is-active')
        $('.layui-layout-admin .layui-body').css('left', '50px');
        $('.layui-layout-admin .layui-menu').css('left', '50px').css('width', 'calc(100% - 50px)');
        $('.layui-layout-admin .layui-side').css('width', '50px');
        $('.layui-layout-admin .layui-logo').css('width', '50px').css('align-content', 'center');
        $('.layui-layout-admin .layui-logo span').css('font-size', '12px');
        $('.layui-layout-admin .layui-logo span .logo-text2').css('display', 'none');
        $('.assoc-dingtalk-user').css('width', '710px');
        setTimeout(() => {
            $('.layui-layout-admin .layui-logo .logo-text2').text('');
            $('.layui-nav-item.layui-this a').each((i, dom) => {
                $(dom).text(scale_maps[dom.innerText]);
            });
        }, 30);
    } else {
        $('.hamburger-container svg').attr('class', 'icon')
        $('.layui-layout-admin .layui-body').css('left', '120px');
        $('.layui-layout-admin .layui-menu').css('left', '120px').css('width', 'calc(100% - 120px)');
        $('.layui-layout-admin .layui-side').css('width', '120px');
        $('.layui-layout-admin .layui-logo').css('width', '120px').css('align-content', 'unset');
        $('.layui-layout-admin .layui-logo span').css('font-size', '18px');
        $('.layui-layout-admin .layui-logo span .logo-text2').css('display', 'block');
        $('.assoc-dingtalk-user').css('width', '640px');
        setTimeout(() => {
            $('.layui-layout-admin .layui-logo .logo-text2').text('简易版系统');
            $('.layui-nav-item.layui-this a').each((i, dom) => {
                for (let key in scale_maps) {
                    if (dom.innerText == scale_maps[key]) {
                        $(dom).text(key);
                    }
                }
            });
        }, 150);
    }
}

function frmUpdateSubmit(data) {
    let layer = layui.layer;
    baseData.updated.domain_desc = data.field.domain_desc;
    layer.close(layForm);
}

function searchTimeStatus(value, isload) {
    let form = layui.form,
        laydate = layui.laydate;
    const selectCol = $('#selectCol'),
        selectVal = $('#selectVal');
    if (isload) {
        selectCol.empty();
        selectVal.empty();
        delete baseData.searchKey;
        delete baseData.searchValue;
        baseData.searchTime = moment().format('YYYY-MM-DD');  // moment() from moment.min.js
        laydate.render({
            elem: '#selectTime',
            trigger: 'click',
            min: '2020-01-01',
            max: moment().format('YYYY-MM-DD'),
            value: baseData.searchTime,
            btns: ['now', 'confirm'],
            done: (value, date) => {
                baseData.searchTime = value;
                getHistoryDingInfo(baseData.searchTime);
            }
        });
    }
    if (value == 'curr') {
        $('.idaas-search-cls-select-time').css('display', 'none');
    } else {
        $('.idaas-search-cls-select-time').css('display', 'inline-block');
    }
    if (value !== '') {
        baseData.searchTimeStatus = value;
        if (baseData.searchTimeStatus == 'curr') {
            for (let k in ADcolMaps) {
                selectCol.append($('<option/>').attr('value', k).text(ADcolMaps[k]));
            }
        }
        for (const k in DDcolMaps) {
            selectCol.append($('<option/>').attr('value', k).text(DDcolMaps[k]));
        }
        if (isload) {
            selectCol.find('option[value="userName"]').prop('selected', true);
            searchColumn('userName');
        }
    }
    form.render('select');
}

function searchColumn(value) {
    let form = layui.form;
    const selectVal = $('#selectVal');
    selectVal.empty();
    selectVal.append($('<option/>').attr('value', '').text('搜索/选择'));
    if (value !== '' && value !== 'enabled') {
        baseData.searchKey = value;
        let valDatas = baseData.searchTime == moment().format('YYYY-MM-DD') ? baseData.fullDatas : baseData.dd_fullDatas;
        let valMaps = [...new Set(valDatas.filter(x => typeof x[baseData.searchKey] !== 'undefined' ? x[baseData.searchKey] : '').map(x => x[baseData.searchKey]))];
        valMaps.sort();
        for (const i in valMaps) {
            selectVal.append($('<option/>').attr('value', valMaps[i]).text(valMaps[i]));
        }
    }
    form.render('select');
}
function searchValue(tableId, value) {
    let table = layui.table,
        form = layui.form,
        laydate = layui.laydate;
    if (value !== '') {
        baseData.searchValue = value;
        table.reload(tableId, {
            page: false,
            where: {
                token: CryptoJS.MD5('token_get_search_value').toString(),
                mode: 'getSearchValue',
                searchKey: baseData.searchKey,
                searchValue: baseData.searchValue,
                timeStatus: baseData.searchTimeStatus,
                historyDate: baseData.searchTime
            },
            done: function (res, curr, count) {
                $('#selectTimeStatus').find(`option[value="${baseData.searchTimeStatus}"]`).prop('selected', true);
                searchTimeStatus(baseData.searchTimeStatus, false);
                $('#selectCol').find(`option[value="${baseData.searchKey}"]`).prop('selected', true);
                searchColumn(baseData.searchKey);
                $('#selectVal').find(`option[value="${baseData.searchValue}"]`).prop('selected', true);
                form.render('select');

                if (baseData.searchTimeStatus == 'prev') {
                    laydate.render({
                        elem: '#selectTime',
                        trigger: 'click',
                        min: '2020-01-01',
                        max: moment().format('YYYY-MM-DD'),
                        value: baseData.searchTime,
                        btns: ['now', 'confirm'],
                        done: (value, date) => {
                            baseData.searchTime = value;
                            getHistoryDingInfo(baseData.searchTime);
                        }
                    });
                }
                pageAddCount(tableId);
                AddRightMouseTips();
            }
        });
    }
}

function searchReset(obj, token, mode) {
    let table = layui.table;
    table.reload(obj.config.id, {
        page: {
            curr: 1
        },
        where: {
            token: token,
            mode: mode,
        },
        done: function (res, curr, count) {
            searchTimeStatus('curr', true);
            pageAddCount(obj.config.id);
            AddRightMouseTips();
        }
    });
}

function getHistoryDingInfo(date) {
    ApiGet('/DingTalk/getHistoryDingInfo', {
        token: CryptoJS.MD5('getHistoryDingInfo').toString(),
        mode: 'getHistoryDingInfo',
        date: date,
    }).then((res) => {
        if (res.code == 0) {
            baseData.dd_fullDatas = res.data;
            searchColumn(baseData.searchKey);
        } else {
            layer.msg('服务端请求失败。', {
                icon: 2,
                time: 3000,
                anim: 6
            });
        }
    }).catch((e) => {
        layer.msg(`请求失败, err: ${e}`, {
            icon: 2,
            time: 3000,
            anim: 6
        });
    });
}

function AddRightMouseTips() {
    let curTips = $('<div>').attr('id', 'idaas-mouseTips').addClass('idaas-mouseTips-none');
    curTips.append($('<p>').addClass('idaas-mouseTips-content'));
    curTips.append($('<i>').addClass('idaas-right-mouseTips-tips'));
    $('#body_main').append(curTips);
    setRightMouseTips(true, false);
}

function setRightMouseTips(is_load, is_sort) {
    $('.mouseTips').mouseenter(function (e) {
        if (($(e.currentTarget).text().trim() == '-')) {
            return;
        }
        $('#idaas-mouseTips').addClass('idaas-mouseTips-block');
        let offsetTipsX = e.clientX - e.offsetX - $('.layui-side-scroll').width() + e.currentTarget.clientWidth - 3;
        let offsetTipsY = e.clientY - e.offsetY - $('.layui-menu').height() + $('.layui-table-body.layui-table-main').scrollTop();
        let tipText = $(e.currentTarget).children('p').attr('data-arr');
        // console.log(e);
        // console.log('offsetTipsX: ' + offsetTipsX, 'offsetTipsY: ' + offsetTipsY);
        $('#idaas-mouseTips').css('top', `${offsetTipsY}px`).css('left', `${offsetTipsX}px`);
        let html_tipText = '';
        if (tipText) {
            html_tipText = tipText.split(',').slice(0, -4).join(',');
        } else {
            $(e.currentTarget).children('p').attr('data-str').split('\n').forEach((tip, i) => {
                if (i == 0) {
                    html_tipText += ['userName', 'dept'].includes($(e.currentTarget).parent().parent().attr('data-field')) ? `<font color='#FFB800'>${tip}</font>` : tip;
                } else {
                    html_tipText += '<br>';
                    html_tipText += tip;
                }
            })
        }
        $('#idaas-mouseTips').children('p').html(html_tipText);
    }).mouseleave(function (e) {
        if ($('#idaas-mouseTips').hasClass('idaas-mouseTips-mouseenter')) { } else {
            $('#idaas-mouseTips').removeClass('idaas-mouseTips-block');
        }
    });
    if (is_load && !is_sort) {
        $('#idaas-mouseTips').mouseenter(function (e) {
            $(this).addClass('idaas-mouseTips-mouseenter');
        }).mouseleave(function (e) {
            $(this).removeClass('idaas-mouseTips-mouseenter');
            $(this).removeClass('idaas-mouseTips-block');
        });
    }
}

function showInfoInCell(obj) {
    let layer = layui.layer,
        form = layui.form;
    baseData['selected'] = {
        show_Id: obj.data.Id,
        show_objGUID: obj.data.objGUID,
        show_cn: obj.data.cn,
        show_ou: obj.data.ou,
        show_secgroup: obj.data.secgroup,
        show_desc: obj.data.desc,
        show_enabled: obj.data.enabled,
        show_displayName: obj.data.displayName,
        show_upn: obj.data.upn,
        show_samid: obj.data.samid,
        show_ad_mail: obj.data.mail,
        show_userName: obj.data.userName,
        show_dept: obj.data.dept,
        show_position: obj.data.position,
        show_jobNumber: obj.data.jobNumber,
        show_dd_email: obj.data.email
    };
    // console.log(baseData);
    layForm = layer.open({
        type: 1,
        title: `（只读）查看 第 [ ${obj.data.Id} ] 行的数据`,
        offset: ['1%', '32%'],
        closeBtn: 0,
        shadeClose: true,
        content: $('#frm_show_info'),
        end: () => {
            $('#frm_show_info').css('display', 'none');
        },
    },
        form.val('frmShowInfo', {
            show_Id: baseData.selected.show_Id,
            show_objGUID: baseData.selected.show_objGUID,
            show_cn: baseData.selected.show_cn,
            show_ou: baseData.selected.show_ou,
            show_secgroup: baseData.selected.show_secgroup,
            show_desc: baseData.selected.show_desc,
            show_enabled: typeof baseData.selected.show_enabled == 'undefined' ? '' : baseData.selected.show_enabled ? '是' : '否',
            show_displayName: baseData.selected.show_displayName,
            show_upn: baseData.selected.show_upn,
            show_samid: baseData.selected.show_samid,
            show_ad_mail: baseData.selected.show_ad_mail,
            show_userName: baseData.selected.show_userName,
            show_dept: baseData.selected.show_dept,
            show_position: baseData.selected.show_position,
            show_jobNumber: baseData.selected.show_jobNumber,
            show_dd_email: baseData.selected.show_dd_email
        }));
}

function updateRowInCell(obj) {
    let layer = layui.layer,
        form = layui.form;
    baseData['updated'] = {
        update_Id: obj.data.Id,
        domain_objGUID: obj.data.objGUID,
        domain_cn: obj.data.cn,
        domain_ou: obj.data.ou,
        domain_secgroup: obj.data.secgroup,
        domain_desc: obj.data.desc,
        domain_enabled: obj.data.enabled,
        ding_userName: obj.data.userName,
        ding_dept: obj.data.dept,
        ding_position: obj.data.position
    };
    // console.log(baseData);
    layForm = layer.open({
        type: 1,
        title: `编辑 第 [ ${obj.data.Id} ] 行的数据, 仅支持修改 [描述] 字段`,
        offset: ['12%', '32%'],
        shadeClose: false,
        content: $('#frm_update_row'),
        end: () => {
            obj.update({
                desc: baseData.updated.domain_desc
            });
            $('#frm_update_row').css('display', 'none');
            setRightMouseTips(false, false, $(obj.tr[0]).children('td[data-field="desc"]').find('.mouseTips'));
        },
    },
        form.val('frmUpdateRow', {
            update_Id: baseData.updated.update_Id,
            domain_objGUID: baseData.updated.domain_objGUID,
            domain_cn: baseData.updated.domain_cn,
            domain_ou: baseData.updated.domain_ou,
            domain_secgroup: baseData.updated.domain_secgroup,
            domain_desc: baseData.updated.domain_desc,
            domain_enabled: typeof baseData.updated.domain_enabled == 'undefined' ? '' : baseData.updated.domain_enabled ? '是' : '否',
            ding_userName: baseData.updated.ding_userName,
            ding_dept: baseData.updated.ding_dept,
            ding_position: baseData.updated.ding_position

        }));
}

function setActionInCell(is_confirm, obj) {
    $(obj.tr[0]).find('div.idaas-cls-cell-radio').attr('data-action', is_confirm ? '1' : '0');
    $(obj.tr[0]).find(`span[lay-event="action-${(is_confirm ? 'confirm' : 'defer')}"]`).addClass('radio-checked');
    $(obj.tr[0]).find(`span[lay-event="action-${(is_confirm ? 'defer' : 'confirm')}"]`).removeClass('radio-checked');
    $(obj.tr[0]).find(`span[lay-event="action-${(is_confirm ? 'confirm' : 'defer')}"]`).children('i.layui-icon').attr('class', 'layui-icon layui-icon-radio');
    $(obj.tr[0]).find(`span[lay-event="action-${(is_confirm ? 'defer' : 'confirm')}"]`).children('i.layui-icon').attr('class', 'layui-icon layui-icon-circle');
    baseData.datas.filter(x => x.Id == obj.data.Id)[0].action = is_confirm ? 1 : 0;
}

function setActionAll(is_confirm) {
    $('div.idaas-cls-cell-radio').attr('data-action', is_confirm ? '1' : '0');
    $(`span[lay-event="action-${(is_confirm ? 'confirm' : 'defer')}"]`).addClass('radio-checked');
    $(`span[lay-event="action-${(is_confirm ? 'defer' : 'confirm')}"]`).removeClass('radio-checked');
    $(`span[lay-event="action-${(is_confirm ? 'confirm' : 'defer')}"]`).children('i.layui-icon').attr('class', 'layui-icon layui-icon-radio');
    $(`span[lay-event="action-${(is_confirm ? 'defer' : 'confirm')}"]`).children('i.layui-icon').attr('class', 'layui-icon layui-icon-circle');
    baseData.datas.forEach(x => { x.action = is_confirm ? 1 : 0; });
}

function IgnoreInRow(obj, tableId) {
    let layer = layui.layer,
        table = layui.table;
    layer.confirm(`是否忽略同步 序号: ${obj.data.Id} 的数据？`, {
        btn: ['确认', '取消']
    }, function () {
        ApiPost('/putTagData', {
            token: CryptoJS.MD5('putTagData').toString(),
            mode: 'put_tag',
            admin: typeof retDingtalkAuth.name !== 'undefined' ? retDingtalkAuth.name : 'Web端',
            tag: JSON.stringify(obj.data)
        }).then((res) => {
            if (res.code == 0) {
                layer.msg('执行成功！', {
                    icon: 1,
                    time: 2000
                });
                var oldDatas = table.cache[tableId];
                delRow(table, tableId, oldDatas);
            } else {
                layer.msg('服务端请求失败。', {
                    icon: 2,
                    time: 3000,
                    anim: 6
                });
            }
        }).catch((e) => {
            layer.msg(`请求失败, err: ${e}`, {
                icon: 2,
                time: 3000,
                anim: 6
            });
        });
    }, function () {
    });
}

function syncAssocData(e) {
    let layer = layui.layer;
    $(e).prop('disabled', true);
    $(e).css('opacity', '0.5');
    setTimeout(() => {
        layer.msg('已同步，请手动刷新页面。', {
            icon: 1,
            time: 3000,
            anim: 6
        });
        $(e).prop('disabled', false);
        $(e).css('opacity', '1');
    }, 120 * 1000);
    ApiPost('/putSyncAssocData', {
        token: CryptoJS.MD5('putSyncAssocData').toString(),
        mode: 'put_syncassocdata',
    });
}

function syncLocalData() {
    $('button[lay-event="syncLocalData"]').prop('disabled', true);
    $('button[lay-event="syncLocalData"]').css('opacity', '0.5');
    ApiPost('/putSyncLocalData', {
        token: CryptoJS.MD5('putSyncLocalData').toString(),
        mode: 'put_synclocaldata',
    }).then((res) => {
        if (res.code == 0) {
            layer.msg('执行成功！', {
                icon: 1,
                time: 2000
            });
            $('button[lay-event="syncLocalData"]').prop('disabled', false);
            $('button[lay-event="syncLocalData"]').css('opacity', '1');
        } else {
            layer.msg('服务端请求失败。', {
                icon: 2,
                time: 3000,
                anim: 6
            });
        }
    }).catch((e) => {
        layer.msg(`请求失败, err: ${e}`, {
            icon: 2,
            time: 3000,
            anim: 6
        });
    });
}

function getLocalData() {
    $('button[lay-event="getLocalData"]').prop('disabled', true);
    $('button[lay-event="getLocalData"]').css('opacity', '0.5');
    ApiGet('/getLocalData', {
        token: CryptoJS.MD5('getLocalData').toString(),
        mode: 'get_localdata',
    }).then((res) => {
        if (res.code == 0) {
            layer.msg('执行成功！', {
                icon: 1,
                time: 2000
            });
            location.reload();
        } else {
            layer.msg('服务端请求失败。', {
                icon: 2,
                time: 3000,
                anim: 6
            });
        }
    }).catch((e) => {
        layer.msg(`请求失败, err: ${e}`, {
            icon: 2,
            time: 3000,
            anim: 6
        });
    });
}

function onExecuteSync(obj, chooseData) {
    let table = layui.table;
    let err_user_count = 0;
    chooseData.forEach(v => {
        if (v.method == 'insert user' && v.jobNumber == '') {
            console.log(`用户 ${v.userName} 的工号为空, 请手工新增域用户.`);
            err_user_count++;
        }
    })
    if (err_user_count > 0) {
        layer.msg('存在工号为空的钉钉用户, 请手工新增域用户.', {
            icon: 2,
            time: 2000
        });
        return;
    }
    ApiPost('/putSyncData', {
        token: CryptoJS.MD5('putSyncData').toString(),
        mode: 'put_sync',
        admin: typeof retDingtalkAuth.name !== 'undefined' ? retDingtalkAuth.name : 'Web端',
        sync: JSON.stringify(chooseData)
    }).then((res) => {
        if (res.code == 0) {
            layer.msg('执行成功！', {
                icon: 1,
                time: 2000
            });
            var oldDatas = table.cache[obj.config.id];
            delRow(table, obj.config.id, oldDatas);
        } else if (res.code == 4001002) {
            layer.msg('权限未开放或执行失败。', {
                icon: 0,
                time: 3000,
                anim: 6
            });
        } else {
            layer.msg('服务端请求失败。', {
                icon: 2,
                time: 3000,
                anim: 6
            });
        }
    }).catch((e) => {
        layer.msg(`请求失败, err: ${e}`, {
            icon: 2,
            time: 3000,
            anim: 6
        });
    });
}

function delRow(table, tableId, oldDatas) {
    var tableArr = [];
    for (var i = 0; i < oldDatas.length; i++) {
        var item = oldDatas[i];
        if (item.LAY_CHECKED) {
            oldDatas.splice(i, 1);
            i--;
        }
    }
    tableArr = oldDatas;
    table.reloadData(tableId, { data: tableArr });
}

function onExecuteSyncQuit(obj, chooseData) {

}