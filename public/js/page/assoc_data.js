/*
 * @Author      :  ww1372247148@163.com
 * @AuthorDNS   :  wendirong.top
 * @CreateTime  :  2024-02-19
 * @FilePath    :  js/page/assoc_data.js
 * @FileVersion :  1.0
 * @FileDesc    :  index的关联查询页面js函数集
*/

const info_map_dd = {
    // id: '用户id',
    name: '用户名称',
    jobNumber: '工号',
    position: '职位',
    email: '企业邮箱',
    ownGroup: '所属部门'
};
const info_map_ad = {
    // ad_objectGUID: '用户GUID',
    ad_userPrincipalName: '用户upn',
    ad_sAMAccountName: '用户samid',
    ad_enabled: '是否启用',
    ad_displayName: '显示名称',
    ad_mail: '用户邮箱',
    ad_distinguishedName: '用户DN',
    ad_description: '用户描述',
    ad_accountErrInfo: 'Err信息'
};
const info_map_tq = {
    term_id: '终端id',
    // computerName: '计算机名称',
    ipv4Addr: 'IPv4地址',
    macAddr: 'MAC地址',
    // workDomain: '工作域',
    isOnline: '终端在线状态',
    lastTime: '最后在线时间',
    userLoginSamid: '终端登录账号',
    userAssetName: '资产责任人(名称)',
    userAssetSamid: '资产责任人(账号)',
    userAssetSN: '关联资产编号',
    serialNumber: 'SN序列号',
    brandModel: '计算机型号',
    cpu: 'CPU型号',
    display: '显卡型号',
    memory: '内存容量',
    storage: '硬盘容量',
    err: '错误信息'
};
const info_map_itasset = {
    // barcode: '资产编码',
    assetTypeName: '资产类别',
    name: '资产名称',
    // ownCompanyName: '所属公司',
    // useCompanyName: '使用公司',
    districtName: '区域',
    address: '存放地点',
    specs: '规格型号',
    sn: '设备序列号',
    managerEmployeeName: '管理人',
    useDepartmentName: '使用部门',
    userEmployeeName: '使用人',
    // purchasedDate: '购入日期',
    source: '来源',
    comment: '备注',
    // serviceLife: '使用期限',
    // measureUnit: '计量单位',
    // amount: '金额',
    ext_cpu: 'CPU',
    ext_memory: '内存',
    ext_harddisk: '硬盘',
    err: '错误信息'
};
const itasset_source_map = {
    1: '购入',
    2: '自建',
    3: '租赁',
    4: '捐赠',
    5: '其他',
    6: '内部购入',
    7: '盘盈'
}

function setTreeNodeColor(e) {
    let data_id = $(e.elem).attr('data-id');
    $('#deptListTree').find('div.bg-eee').removeClass('bg-eee');
    $('#deptListTree').find('span.layui-tree-txt').removeClass('color-3B7CFF');
    $('#deptListTree').find('i.layui-tree-iconArrow').removeClass('border-color-3B7CFF');
    $(e.elem).children('div.layui-tree-entry').addClass('bg-eee');
    $(e.elem).children('div.layui-tree-entry').find('span.layui-tree-txt').addClass(data_id == -1 ? 'color-unassoc' : 'color-3B7CFF');
    $(e.elem).children('div.layui-tree-entry').find('i.layui-tree-iconArrow').addClass('border-color-3B7CFF');
}

function setErrDataTreeNodeColor() {
    $('#deptListTree').find('div[data-id="-1"]').find('.layui-tree-txt').addClass('color-unassoc');
}

function setTreeTitle() {
    $('#deptListTree').find('span.layui-tree-txt').each((i, e) => {
        $(e).attr('title', $(e).text());
    });
}

function loadTreeData(tree, elem) {
    $(document).click(e => {
        $('#mouseMenu').css('display', 'none');
        $('#tq_list').children('div').removeClass('bg-eee');
        $('#itasset_list').children('div').removeClass('bg-eee');
    });
    $('#userListFlow').scroll(e => {
        $('#mouseMenu').find('#menuFlow').hasClass('menu-show') ? $('#mouseMenu').css('display', 'none') : '';
    });
    $('#userListAssoc').scroll(e => {
        $('#mouseMenu').find('#menuAssoc_tq').hasClass('menu-show') ? $('#mouseMenu').css('display', 'none') : '';
        $('#mouseMenu').find('#menuAssoc_itasset').hasClass('menu-show') ? $('#mouseMenu').css('display', 'none') : '';
        $('#tq_list').children('div').removeClass('bg-eee');
        $('#itasset_list').children('div').removeClass('bg-eee');
    });
    $('#mouseMenu').find('li').each((i, item) => {
        $(item).click(e => { opt_ignore(item); });
    })

    let layer = layui.layer;
    ApiGet('/Assoc/getTreeData', {
        token: CryptoJS.MD5('getAssocTreeData').toString(),
        mode: 'get_assoctreedata',
    }).then((res) => {
        if (res.code == 0) {
            baseData.trees = res.data;
            baseData.users = res.users;
            baseData.not_match_tq = res.not_match_tq;
            baseData.not_match_itasset = res.not_match_itasset;
            baseData.not_used_tq_list = res.not_used_tq_list;
            baseData.count = res.count;
            tree.render({
                elem: elem,
                data: res.data,
                showLine: false,
                click: (obj) => {
                    treeNodeClick(obj);
                }
            });
            setErrDataTreeNodeColor();
            setTreeTitle();
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

function loadMouseDropdown_userFlow() {
    let menus = $('#userListFlow').children('li');
    let flow_height = $('#userListFlow').height();
    menus.each((i, e) => {
        $(e).contextmenu((event => {
            event.preventDefault();

            menus.removeClass('bg-eee');
            $(e).addClass('bg-eee');
            $('#mouseMenu').children('ul').removeClass('menu-show');
            $('#mouseMenu').find('#menuFlow').addClass('menu-show');
            let menu_height = $('#mouseMenu').height();
            let menu_X = event.clientX;
            let menu_Y = event.clientY + menu_height - 152;
            menu_X = menu_Y >= flow_height - 5 ? menu_X + 3 : menu_X;
            menu_Y = menu_Y >= flow_height - 5 ? event.clientY - menu_height : event.clientY;
            $('#mouseMenu').attr('data-id', $(e).attr('data-id')).attr('data-var', $(e).find('span.user-name').text()).css('display', 'block').css('left', menu_X).css('top', menu_Y);
            return false;
        }));
    });
}

function loadMouseDropdown_assocList(menus, type, user_info) {
    let window_width = $(window).width();
    menus.each((i, e) => {
        if (type == 'tq' && user_info.assoc_tq.filter(x => x.term_id == $(e).attr('data-tq-id')).some(x => x.err.length == 0)) {
            return;
        } else if (type == 'itasset' && user_info.assoc_itasset.filter(x => x.barcode == $(e).attr('data-itasset-id')).some(x => x.err.length == 0)) {
            return;
        }
        $(e).contextmenu((event => {
            event.preventDefault();

            menus.removeClass('bg-eee');
            $(e).addClass('bg-eee');
            $('#mouseMenu').children('ul').removeClass('menu-show');
            $('#mouseMenu').find(`#menuAssoc_${type}`).addClass('menu-show');
            let menu_width = $('#mouseMenu').width();
            let menu_height = $('#mouseMenu').height();
            let assoc_height = $('#userListAssoc').height();
            let menu_X = event.clientX + menu_width;
            menu_X = menu_X >= window_width ? event.clientX - menu_width : event.clientX;
            let menu_Y = event.clientY + menu_height - 110;
            menu_X = menu_Y >= assoc_height - 5 ? menu_X + 1 : menu_X;
            menu_Y = menu_Y >= assoc_height - 5 ? event.clientY - menu_height : event.clientY;
            $('#mouseMenu').attr(`data-${type}-id`, $(e).attr(`data-${type}-id`)).attr('data-var', $(e).find(`.${type}-barcode`).text()).css('display', 'block').css('left', menu_X).css('top', menu_Y);
        }));
    });
}

function opt_ignore(e) {
    let layer = layui.layer;
    let dd_id, dd_name, data_id;
    let type = $(e).parent().attr('data-type');
    let is_ignore = $(e).attr('data-ignore') == '1';
    let ignore_str = $(e).children('div').attr('data-str');
    let menu = $(e).parent().parent();
    if (type == 'tq' && ignore_str == '绑定关联资产编号' && !menu.attr('data-var')) {
        layer.msg('关联资产编号不能为空。', {
            icon: 0,
            time: 3000,
            anim: 6
        });
        return;
    }
    switch (type) {
        case 'flow':
            dd_id = data_id = menu.attr('data-id');
            dd_name = menu.attr('data-var');
            break;
        case 'tq':
        case 'itasset':
            dd_id = $('#userListAssoc').find('span.user-id').text();
            dd_name = $('#userListAssoc').find('span.user-name').text();
            data_id = menu.attr(`data-${type}-id`);
            break;
    }

    ApiPost('/Assoc/putIgnoreData', {
        token: CryptoJS.MD5('putIgnoreData').toString(),
        mode: `put_ignore_${type}`,
        dd_id: dd_id,
        dd_name: dd_name,
        data_id: data_id,
        var: menu.attr('data-var'),
        is_ignore: is_ignore ? '1' : '0',
        ignore_str: ignore_str
    }).then((res) => {
        if (res.code == 0) {
            let uflow = $('#userListFlow').find(`li[data-id="${dd_id}"]`);
            switch (type) {
                case 'flow':
                    is_ignore ? uflow.find('div.assoc-wrap.wrap-assoc').addClass('ignore-user').find('div.wrap-tip.ignore-assoc').find('span').text(ignore_str) : uflow.find('div.assoc-wrap.wrap-assoc').removeClass('ignore-user');
                    baseData.users.filter(x => x.id == dd_id)[0].is_ignore = is_ignore;
                    baseData.users.filter(x => x.id == dd_id)[0].ignore_str = ignore_str;
                    $('#deptListTree').find('div[data-id="-1"]').find('span.layui-tree-txt').text(`问题列表(${get_problem_list(baseData).length}人)`);
                    break;
                case 'tq':
                    let utq = $('#userListAssoc').find(`div[data-tq-id="${data_id}"]`);
                    is_ignore ? uflow.find(`div[data-tq-id="${data_id}"]`).addClass('ignore-btn').find('span.assoc-state').addClass('not-show') : uflow.find(`div[data-tq-id="${data_id}"]`).removeClass('ignore-btn').find('span.assoc-state').removeClass('not-show');
                    is_ignore ? utq.find('.ignore-assoc').addClass('ignore-btn') : utq.find('.ignore-assoc').removeClass('ignore-btn');
                    err_text = utq.find('textarea.err-text');
                    is_ignore ? err_text.text(`【${ignore_str}】` + (err_text.text().match(/【.+】/) ? err_text.text().replace(err_text.text().match(/【.+】/)[0], '') : err_text.text())) : err_text.text((err_text.text().match(/【.+】/) ? err_text.text().replace(err_text.text().match(/【.+】/)[0], '') : err_text.text()));
                    baseData.users.filter(x => x.id == dd_id)[0].assoc_tq.filter(x => x.term_id == data_id)[0].is_ignore = is_ignore;
                    baseData.users.filter(x => x.id == dd_id)[0].assoc_tq.filter(x => x.term_id == data_id)[0].ignore_str = ignore_str;
                    $('#deptListTree').find('div[data-id="-1"]').find('span.layui-tree-txt').text(`问题列表(${get_problem_list(baseData).length}人)`);
                    break;
                case 'itasset':
                    let uitasset = $('#userListAssoc').find(`div[data-itasset-id="${data_id}"]`);
                    is_ignore ? uflow.find('div.btn-itasset').addClass('ignore-btn').find('span.assoc-state').addClass('not-show') : uflow.find('div.btn-itasset').removeClass('ignore-btn').find('span.assoc-state').removeClass('not-show');
                    is_ignore ? uitasset.find('.ignore-assoc').addClass('ignore-btn') : uitasset.find('.ignore-assoc').removeClass('ignore-btn');
                    if (uflow.find('div.btn-tq').length == 1 && uflow.find('div.btn-tq').find('span.assoc-state').hasClass('not-assoc')) {
                        is_ignore ? uflow.find('div.btn-tq').addClass('ignore-btn') : uflow.find('div.btn-tq').removeClass('ignore-btn');
                    }
                    err_text = uitasset.find('textarea.err-text');
                    is_ignore ? err_text.text(`【${ignore_str}】` + (err_text.text().match(/【.+】/) ? err_text.text().replace(err_text.text().match(/【.+】/)[0], '') : err_text.text())) : err_text.text((err_text.text().match(/【.+】/) ? err_text.text().replace(err_text.text().match(/【.+】/)[0], '') : err_text.text()));
                    baseData.users.filter(x => x.id == dd_id)[0].assoc_itasset.filter(x => x.barcode == data_id)[0].is_ignore = is_ignore;
                    baseData.users.filter(x => x.id == dd_id)[0].assoc_itasset.filter(x => x.barcode == data_id)[0].ignore_str = ignore_str;
                    baseData.users.filter(x => x.id == dd_id)[0].itasset_is_ignore = baseData.users.filter(x => x.id == dd_id)[0].assoc_itasset.filter(x => x.err.length > 0 && !x.is_ignore).length == 0;
                    $('#deptListTree').find('div[data-id="-1"]').find('span.layui-tree-txt').text(`问题列表(${get_problem_list(baseData).length}人)`);
                    break;
            }
        }
    });
}

function showInfoClickUser(e, dept_id) {
    $(e.currentTarget).parent().children('li').removeClass('bg-eee');
    $(e.currentTarget).addClass('bg-eee');

    $('#dd_info').empty();
    $('#ad_info').empty();
    $('#tq_list').empty();
    $('#itasset_list').empty();
    let panel_dd = $('#dd_info');
    let panel_ad = $('#ad_info');
    let panel_tq = $('#tq_list');
    let panel_itasset = $('#itasset_list');

    let user_info = baseData.users.filter(x => x.id == $(e.currentTarget).attr('data-id'))[0];
    baseData.curUser = user_info;
    console.log(user_info);

    let node = `
            <p class="colla-info-text">用户id：<span class="user-id">${user_info.id}</span></p>
            <div class="layui-colla-content layui-show">
                <ul>`;
    Object.keys(info_map_dd).forEach(k => {
        if (k in user_info) {
            switch (k) {
                case 'ownGroup':
                    node += `
                    <li class="colla-line" style="height: 100%; align-items:flex-start;">
                        <label class="colla-label">${info_map_dd[k]}：</label>
                    `;
                    node += `<textarea class="colla-text" cols="24" rows="6" readonly>${user_info[k].join('\r\n')}</textarea>`;
                    break;
                default:
                    node += `
                    <li class="colla-line">
                        <label class="colla-label">${info_map_dd[k]}：</label>
                    `;
                    node += `<span class="${(k == 'name' ? 'user-name ' : '')}colla-text hide-overflow">${user_info[k]}</span>`;
                    break;
            }
            node += `</li>`;
        }
    });
    node += `
                </ul>
            </div>`;
    panel_dd.append(node);

    node = `
            <p class="colla-info-text">用户GUID：<span class="user-objectguid">${user_info.assoc_ad.ad_objectGUID}</span></p>
            <div class="layui-colla-content layui-show">
                <ul>`;
    Object.keys(info_map_ad).forEach(k => {
        if (k in user_info.assoc_ad) {
            node += `
                <li class="colla-line">
                    <label class="colla-label">${info_map_ad[k]}：</label>`;
            switch (k) {
                case 'ad_distinguishedName':
                case 'ad_description':
                case 'ad_accountErrInfo':
                    node += `<input type="text" class="colla-input" value="${user_info.assoc_ad[k]}" readonly />`;
                    break;
                default:
                    node += `<span class="colla-text hide-overflow">${(k == 'ad_enabled' ? (user_info.assoc_ad[k] == '1' ? '是' : '否') : user_info.assoc_ad[k])}</span>`;
                    break;
            }
            node += `</li>`;
        }
    });
    node += `
                </ul>
            </div>`;
    panel_ad.append(node);

    user_info.assoc_tq.sort((a, b) => {
        if (a.isOnline < b.isOnline) return 1; if (a.isOnline > b.isOnline) return -1; return 0;
    }).forEach(term => {
        let node = `
            <div data-tq-id="${term.term_id}" class="layui-colla-item assoc-item">
                <p class="colla-info-text ${(term.isOnline == '1' ? 'color-online' : 'color-offline')}">计算机名称：<span class="user-computername">${term.computerName}</span></p>
                <div class="layui-colla-content layui-show">
                    <ul>`;
        Object.keys(info_map_tq).forEach(k => {
            if (k in term) {
                if (['err'].includes(k) && term.err.length > 0) {
                    term.err.forEach(err => {
                        node += `
                        <li class="colla-line" style="height: 100%; align-items:flex-start;">
                            <label class="colla-label">错误信息：
                                <div class="${(term.is_ignore ? 'ignore-btn ' : '')}ignore-assoc">
                                    <span class="bg-state-tip">忽略错误</span>
                                </div>
                            </label>
                            <textarea class="err-text colla-text" cols="31" rows="3" readonly>${(term.is_ignore ? `【${term.ignore_str}】${err.msg}` : err.msg)}</textarea>
                        </li>`;
                    });
                } else {
                    node += `
                        <li class="colla-line"${(['brandModel', 'cpu', 'display'].includes(k) ? 'style="height: 100%; align-items:flex-start;"' : '')}>
                            <label class="colla-label">${info_map_tq[k]}：</label>`;
                    switch (k) {
                        case 'term_id':
                            node += `<input type="text" class="colla-input" value="${term[k]}" readonly />`;
                            break;
                        case 'brandModel':
                            node += `<textarea class="colla-text" cols="31" rows="3" readonly>${term[k]}</textarea>`;
                            break;
                        case 'cpu':
                        case 'display':
                            node += `<textarea class="colla-text" cols="31" rows="2" readonly>${term[k]}</textarea>`;
                            break;
                        case 'userAssetSN':
                            node += `<span class="tq-barcode colla-text hide-overflow">${term[k]}</span>`;
                            break;
                        default:
                            node += `<span class="colla-text hide-overflow">${(k == 'isOnline' ? (term.isOnline == '1' ? '在线' : '离线') : term[k])}</span>`;
                            break;
                    }
                    node += `</li>`;
                }
            }
        });
        node += `
                    </ul>
                </div>
            </div>`;
        panel_tq.append(node);
    });

    user_info.assoc_itasset.forEach(asset => {
        let node = `
            <div data-itasset-id="${asset.barcode}" class="layui-colla-item assoc-item">
                <p class="colla-info-text">资产编码：<span class="itasset-barcode">${asset.barcode}</span></p>
                <div class="layui-colla-content layui-show">
                    <ul>`;
        Object.keys(info_map_itasset).forEach(k => {
            if (k in asset) {
                if (['err'].includes(k) && asset.err.length > 0) {
                    asset.err.forEach(err => {
                        node += `
                        <li class="colla-line" style="height: 100%; align-items:flex-start;">
                            <label class="colla-label">错误信息：
                                <div class="${(asset.is_ignore ? 'ignore-btn ' : '')}ignore-assoc">
                                    <span class="bg-state-tip">忽略错误</span>
                                </div>
                            </label>
                            <textarea class="err-text colla-text" cols="31" rows="3" readonly>${(asset.is_ignore ? `【${asset.ignore_str}】${err.msg}` : err.msg)}</textarea>
                        </li>`;
                    });
                } else {
                    node += `
                        <li class="colla-line"${(['comment'].includes(k) ? 'style="height: 100%; align-items:flex-start;"' : '')}>
                            <label class="colla-label">${info_map_itasset[k]}：</label>`;
                    switch (k) {
                        case 'comment':
                            node += `<textarea class="colla-text" cols="31" rows="3" readonly>${asset[k]}</textarea>`;
                            break;
                        default:
                            node += `<span class="colla-text hide-overflow">${(['source'].includes(k) ? itasset_source_map[asset[k]] : asset[k])}</span>`;
                            break;
                    }
                    node += `</li>`;
                }
            }
        });
        node += `
                    </ul>
                </div>
            </div>`;
        panel_itasset.append(node);
    });
    panel_tq.children().each((i, e) => {
        if (i % 2 == 0) {
            $(e).css('margin-right', '5px');
        }
    });
    panel_itasset.children().each((i, e) => {
        if (i % 2 == 0) {
            $(e).css('margin-right', '5px');
        }
    });
    loadMouseDropdown_assocList($('#userListAssoc').find('div#tq_list').find('div.assoc-item'), 'tq', user_info);
    loadMouseDropdown_assocList($('#userListAssoc').find('div#itasset_list').find('div.assoc-item'), 'itasset', user_info);
}

function treeNodeClick(e) {
    baseData.curNode = e.data;
    setTreeNodeColor(e);
    setNavLink(e.data);
    setUserFlow(e.data);
    loadMouseDropdown_userFlow();
    $('#userListFlow').attr('data-id', e.data.id);
    $('#dd_info').empty();
    $('#ad_info').empty();
    $('#tq_list').empty();
    $('#itasset_list').empty();
}

function jumpDept(e) {
    $(`div[data-id="${$(e).attr('data-id')}"]`).find('.layui-tree-txt')[0].click();
}

function setNavLink(data) {
    $('#navLink').empty();
    if (['-1', '-2', '-3'].includes(data.id)) {
        $('#navLink').append('<a>myside我的企业</a>');
    } else {
        $('#navLink').append('<a>myside我的企业</a><i></i>');
        data.deptMap.forEach((dept, i) => {
            if (i == data.deptMap.length - 1) {
                node = `<a data-id="${dept.id}">${dept.name}</a>`;
            } else {
                node = `<a data-id="${dept.id}"class="is-link">${dept.name}</a><i></i>`;
            }
            $('#navLink').append(node);
        });
        $('#navLink').find('a.is-link').click(e => { jumpDept(e.currentTarget); });
    }
}

function append_not_match(data) {
    let filter_list = baseData.not_match_tq.filter(x => x.ownPathNames.startsWith(data.ownDepts));
    let tq_len = filter_list.length;
    let text = `部门未匹配的天擎终端(${tq_len})`;
    let node = `
    <li class="not-used-entry">
        <span class="not-used-list ${(tq_len > 0 ? 'is-jump ' : '')}div-flex">${text}</span>
    </li>
    `;
    $('#userListFlow').append(node);
    $('#userListFlow').find('span.is-jump').click(e => {
        let filter_list = baseData.not_match_tq.filter(x => x.ownPathNames.startsWith(data.ownDepts)).sort((a, b) => {
            if (a.computerName < b.computerName) return -1; if (a.computerName > b.computerName) return 1; return 0;
        });
        $('#navLink').find('a').last().addClass('is-link').click(e => { jumpDept(e.currentTarget); });
        $('#navLink').append(`<i></i><a>${text}</a>`);
        $('#userListFlow').empty();
        filter_list.forEach(item => {
            let assoc_itasset = item.assoc_itasset.length > 0;
            let node = `
            <li data-id="${item.id}" class="user-entry">
                <div class="user-name-wrap div-flex">`;
            if (item.ownGroup.includes(data.ownDepts)) {
                node += `
                    <div class="assoc-entry wrap-direct div-inline-flex">
                        <span class="assoc-type bg-state-tip">直属</span>
                    </div>`;
            }
            node += `
                    <span class="user-name">${item.computerName}</span>
                    <div class="assoc-entry div-inline-flex btn-itasset">
                        <span class="assoc-type bg-state-itasset">固定资产</span>
                        <span class="assoc-state ${(assoc_itasset ? 'color-assoc' : 'color-unassoc')}">${(assoc_itasset ? `已关联(${item.assoc_itasset.length})` : '未关联')}</span>
                    </div>
                </div>
                <div class="user-moreinfo-wrap div-flex">
                    <span>${(item.ownPathNames ? item.ownPathNames : item.ownGroup)}</span>
                    <span>（资产责任人：${item.userAssetName}[${item.userAssetSamid}]）</span>
                </div>
            </li>`;
            $('#userListFlow').append(node);
        });
        $('#userListFlow').scrollTop(0);
        $('#userListFlow').children('li.user-entry').each((i, item) => {
            $(item).click(e => { showInfoClickNotUsed(e, 'tq'); });
        });
    });
}


function showInfoClickNotUsed(e, type) {
    $(e.currentTarget).parent().children('li').removeClass('bg-eee');
    $(e.currentTarget).addClass('bg-eee');

    $('#dd_info').empty();
    $('#ad_info').empty();
    $('#tq_list').empty();
    $('#itasset_list').empty();
    let panel_tq = $('#tq_list');
    let panel_itasset = $('#itasset_list');

    let user_info;
    let tq_items;
    let itasset_items;
    switch (type) {
        case 'tq':
            user_info = baseData.not_match_tq.filter(x => x.id == $(e.currentTarget).attr('data-id'))[0];
            tq_items = [user_info];
            itasset_items = user_info.assoc_itasset;
            break;
        case 'itasset':
            user_info = baseData.not_match_itasset.filter(x => x.barcode == $(e.currentTarget).attr('data-id'))[0];
            tq_items = user_info.assoc_tq;
            itasset_items = [user_info];
            break;
    }
    baseData.curUser = user_info;
    console.log(user_info);

    tq_items.forEach(term => {
        let node = `
            <div data-tq-id="${term.id}" class="layui-colla-item assoc-item">
                <p class="colla-info-text ${(term.isOnline == '1' ? 'color-online' : 'color-offline')}">计算机名称：<span class="user-computername">${term.computerName}</span></p>
                <div class="layui-colla-content layui-show">
                    <ul>`;
        Object.keys(info_map_tq).forEach(k => {
            if (k in term) {
                if (['err'].includes(k) && term.err.length > 0) {
                    term.err.forEach(err => {
                        node += `
                        <li class="colla-line" style="height: 100%; align-items:flex-start;">
                            <label class="colla-label">错误信息：</label>
                            <textarea class="err-text colla-text" cols="31" rows="3" readonly>${err.msg}</textarea>
                        </li>`;
                    });
                } else {
                    node += `
                        <li class="colla-line"${(['brandModel', 'cpu', 'display'].includes(k) ? 'style="height: 100%; align-items:flex-start;"' : '')}>
                            <label class="colla-label">${info_map_tq[k]}：</label>`;
                    switch (k) {
                        case 'term_id':
                            node += `<input type="text" class="colla-input" value="${term[k]}" readonly />`;
                            break;
                        case 'brandModel':
                            node += `<textarea class="colla-text" cols="31" rows="3" readonly>${term[k]}</textarea>`;
                            break;
                        case 'cpu':
                        case 'display':
                            node += `<textarea class="colla-text" cols="31" rows="2" readonly>${term[k]}</textarea>`;
                            break;
                        case 'userAssetSN':
                            node += `<span class="tq-barcode colla-text hide-overflow">${term[k]}</span>`;
                            break;
                        default:
                            node += `<span class="colla-text hide-overflow">${(k == 'isOnline' ? (term.isOnline == '1' ? '在线' : '离线') : term[k])}</span>`;
                            break;
                    }
                    node += `</li>`;
                }
            }
        });
        node += `
                    </ul>
                </div>
            </div>`;
        panel_tq.append(node);
    });
    panel_tq.children().each((i, e) => {
        if (i % 2 == 0) {
            $(e).css('margin-right', '5px');
        }
    });

    itasset_items.forEach(asset => {
        let node = `
            <div data-itasset-id="${asset.barcode}" class="layui-colla-item assoc-item">
                <p class="colla-info-text">资产编码：<span class="itasset-barcode">${asset.barcode}</span></p>
                <div class="layui-colla-content layui-show">
                    <ul>`;
        Object.keys(info_map_itasset).forEach(k => {
            if (k in asset) {
                if (['err'].includes(k) && asset.err.length > 0) {
                    asset.err.forEach(err => {
                        node += `
                        <li class="colla-line" style="height: 100%; align-items:flex-start;">
                            <label class="colla-label">错误信息：</label>
                            <textarea class="err-text colla-text" cols="31" rows="3" readonly>${err.msg}</textarea>
                        </li>`;
                    });
                } else {
                    node += `
                        <li class="colla-line"${(['comment'].includes(k) ? 'style="height: 100%; align-items:flex-start;"' : '')}>
                            <label class="colla-label">${info_map_itasset[k]}：</label>`;
                    switch (k) {
                        case 'comment':
                            node += `<textarea class="colla-text" cols="31" rows="3" readonly>${asset[k]}</textarea>`;
                            break;
                        default:
                            node += `<span class="colla-text hide-overflow">${(['source'].includes(k) ? itasset_source_map[asset[k]] : asset[k])}</span>`;
                            break;
                    }
                    node += `</li>`;
                }
            }
        });
        node += `
                    </ul>
                </div>
            </div>`;
        panel_itasset.append(node);
    });
    panel_itasset.children().each((i, e) => {
        if (i % 2 == 0) {
            $(e).css('margin-right', '5px');
        }
    });
}

function setUserFlow(data) {
    $('#userListFlow').empty();
    let showdept;
    let filter_users;
    if (data.id == '-1') {
        filter_users = get_problem_list(baseData);
        showdept = true;
    } else if (data.id == '-2') {
        setNotUsedFlow_tq(baseData.not_used_tq_list);
        return;
    } else if (data.id == '-3') {
        setNotUsedFlow_itasset(baseData.not_match_itasset);
        return;
    } else {
        filter_users = baseData.users.filter(x => x.ownGroup.some(g => g.startsWith(data.ownDepts))).sort((x, y) => {
            let xa = x.ownGroup.includes(data.ownDepts),
                ya = y.ownGroup.includes(data.ownDepts),
                xb = x.is_ignore || x.assoc_tq.some(tq => tq.err.length > 0 && tq.is_ignore) || x.assoc_itasset.some(itasset => itasset.err.length > 0 && itasset.is_ignore),
                yb = y.is_ignore || y.assoc_tq.some(tq => tq.err.length > 0 && tq.is_ignore) || y.assoc_itasset.some(itasset => itasset.err.length > 0 && itasset.is_ignore);
            if (xa && xb && (!ya || !yb)) {
                return -1;
            } else if ((!xa || !xb) && ya && yb) {
                return 1;
            } else if (xa && !ya) {
                return -1;
            } else if (!xa && ya) {
                return 1;
            } else if (xb && !yb) {
                return -1;
            } else if (!xb && yb) {
                return 1;
            } else {
                return 0;
            }
        });
        showdept = false;
        append_not_match(data);
    }


    filter_users.forEach(user => {
        if (user == null) {
            $('#userListFlow').append('<h2 style="margin:10px;color:#f00;">存在未同步的数据，查看<a href="/?map=sync_data" style="color:#00f;font-weight:bold;">数据同步</a></h2>');
            return;
        }
        let assoc_ad = Object.keys(user.assoc_ad).length > 0;
        let assoc_tq = user.assoc_tq.length > 0;
        let assoc_itasset = user.assoc_itasset.length > 0;
        let itasset_err = user.assoc_itasset.length > 0 && user.assoc_itasset.some(x => x.err.length > 0);
        let node = `
        <li data-id="${user.id}" class="user-entry">
            <div class="user-name-wrap div-flex">`;
        if (user.ownGroup.includes(data.ownDepts)) {
            node += `
                <div class="assoc-entry wrap-direct div-inline-flex">
                    <span class="assoc-type bg-state-tip">直属</span>
                </div>`;
        }
        node += `<span class="user-name">${user.name}</span>
                <div class="assoc-wrap wrap-assoc div-flex${(user.is_ignore ? ' ignore-user' : '')}">
                    <div class="assoc-entry wrap-tip ignore-assoc">
                        <span class="assoc-type bg-state-tip">${user.ignore_str}</span>
                    </div>
                    <div class="assoc-entry div-inline-flex btn-ad">
                        <span class="assoc-type bg-state-ad">域控</span>`;
        if (assoc_ad) {
            node += `<span class="assoc-state ${(user.assoc_ad.ad_enabled == '1' ? 'color-assoc">已启用</span>' : 'color-unassoc">已禁用</span>')}`;
        } else {
            node += `<span class="assoc-state color-unassoc">未关联</span>`;
        }
        node += `</div>`;
        if (assoc_tq) {
            user.assoc_tq.sort((a, b) => {
                if (a.isOnline < b.isOnline) return 1; if (a.isOnline > b.isOnline) return -1; return 0;
            }).forEach(term => {
                let tq_err = term.err.length > 0;
                node += `
                    <div data-tq-id="${term.term_id}" class="assoc-entry div-inline-flex${(term.is_ignore ? ' ignore-btn' : '')} btn-tq">
                        <span class="assoc-type bg-state-tq">天擎</span>
                        <span class="assoc-state err-assoc ${(term.is_ignore ? 'not-show ' : '')}${(tq_err ? 'color-unassoc' : (term.isOnline === '1' ? 'color-online' : 'color-offline'))}">${(tq_err ? '关联错误' : (term.isOnline === '1' ? '终端在线' : '终端离线'))}</span>
                        <div class="ignore-assoc">
                            <span class="assoc-type bg-state-tip">忽略错误</span>
                        </div>
                    </div>
                    `;
            });
        } else {
            node += `
                    <div data-tq-id="" class="assoc-entry div-inline-flex btn-tq">
                        <span class="assoc-type bg-state-tq">天擎</span>
                        <span class="assoc-state not-assoc color-unassoc">未关联</span>
                        <div class="ignore-assoc">
                            <span class="assoc-type bg-state-tip">忽略错误</span>
                        </div>
                    </div>
                    `;
        }
        node += `
                    <div class="assoc-entry div-inline-flex${(user.itasset_is_ignore ? ' ignore-btn' : '')} btn-itasset">
                        <span class="assoc-type bg-state-itasset">固定资产</span>
                        <span class="assoc-state ${(user.itasset_is_ignore ? 'not-show ' : '')}${(!assoc_itasset || itasset_err ? 'color-unassoc' : 'color-assoc')}">${(assoc_itasset ? (itasset_err ? '关联错误' : '已关联') : '未关联')}</span>
                        <div class="ignore-assoc">
                            <span class="assoc-type bg-state-tip">忽略错误</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="user-moreinfo-wrap div-flex">
                <span>${user.position}${(showdept ? (`  （${user.ownGroup[0]}）`) : '')}</span>
            </div>
        </li>`;
        $('#userListFlow').append(node);
        $('#userListFlow').scrollTop(0);
    });
    $('#userListFlow').children('li.user-entry').each((i, item) => {
        $(item).click(e => { showInfoClickUser(e, data.id); });
    });
}

function setNotUsedFlow_tq(data) {
    data.forEach(item => {
        let assoc_itasset = item.assoc_itasset.length > 0;
        let node = `
        <li data-id="${item.id}" class="user-entry">
            <div class="user-name-wrap div-flex">
                <span class="user-name">${item.computerName}</span>
                <div class="assoc-entry div-inline-flex btn-itasset">
                    <span class="assoc-type bg-state-itasset">固定资产</span>
                    <span class="assoc-state ${(assoc_itasset ? 'color-assoc' : 'color-unassoc')}">${(assoc_itasset ? `已关联(${item.assoc_itasset.length})` : '未关联')}</span>
                </div>
            </div>
            <div class="user-moreinfo-wrap div-flex">
                <span>${(item.ownPathNames ? item.ownPathNames : item.ownGroup)}</span>
                <span>（资产责任人：${item.userAssetName}[${item.userAssetSamid}]）</span>
            </div>
        </li>`;
        $('#userListFlow').append(node);
    });
    $('#userListFlow').scrollTop(0);
    $('#userListFlow').children('li.user-entry').each((i, item) => {
        $(item).click(e => { showInfoClickNotUsed(e, 'tq'); });
    });
}

function setNotUsedFlow_itasset(data) {
    data.forEach(item => {
        let assoc_tq = item.assoc_tq.length > 0;
        let node = `
        <li data-id="${item.barcode}" class="user-entry">
            <div class="user-name-wrap div-flex">
                <span class="user-name">${item.barcode}</span>
                <div class="assoc-entry div-inline-flex btn-tq">
                    <span class="assoc-type bg-state-tq">天擎</span>
                    <span class="assoc-state ${(assoc_tq ? 'color-assoc' : 'color-unassoc')}">${(assoc_tq ? `已关联(${item.assoc_tq.length})` : '未关联')}</span>
                </div>
            </div>
            <div class="user-moreinfo-wrap div-flex">
                <span>${(item.useDepartmentName ?? '')}</span>
                <span>（${(item.assetTypeName ?? '')}）</span>
            </div>
        </li>`;
        $('#userListFlow').append(node);
    });
    $('#userListFlow').scrollTop(0);
    $('#userListFlow').children('li.user-entry').each((i, item) => {
        $(item).click(e => { showInfoClickNotUsed(e, 'itasset'); });
    });
}

function get_problem_list(data) {
    return data.users.filter(x => !x.is_ignore && (x.assoc_tq.length == 0 || x.assoc_itasset.length == 0 || x.assoc_tq.some(t => t.err.length > 0 && !t.is_ignore) || x.assoc_itasset.some(y => y.err.length > 0 && !y.is_ignore)));
    return data.users.filter(x => !x.is_ignore && (x.assoc_tq.length == 0 || x.assoc_itasset.length == 0 || x.assoc_tq.filter(t => t.err.length > 0 && !t.is_ignore).length > 0 || x.assoc_itasset.filter(y => y.err.length > 0 && !y.is_ignore).length > 0));
}
