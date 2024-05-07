/*
 * @Author      :  ww1372247148@163.com
 * @AuthorDNS   :  wendirong.top
 * @CreateTime  :  2024-02-19
 * @FilePath    :  js/page/main.js
 * @FileVersion :  1.0
 * @FileDesc    :  index的关联查询页面js函数集
*/

const title_maps = {
    ad_ou: 'OU组',
    ad_sec: '域安全组',
    ad_user: '域用户',
    assoc_ad_user: '(已关联钉钉)域用户',
    unassoc_ad_user: '(未关联钉钉)域用户',
    unrelated_ad_user: '(非关联钉钉)域用户',
    dd_dept: '钉钉部门',
    dd_user: '钉钉用户',
    assoc_dd_user: '(已关联域控)钉钉用户',
    unassoc_dd_user: '(未关联域控)钉钉用户',
    term: '天擎终端总数',
    idle_term: '未分配终端数量',
    null_term: '空信息终端数量',
    repeat_term: '重复终端',
    assetSN_repeat_term: '资产编号重复终端',
    asset: 'IT类固定资产总数',
    computer_asset: '电脑资产',
    display_asset: '显示器资产',
    idle_computer_asset: '未分配电脑资产',
    idle_display_asset: '未分配显示器资产'
}

const tip_maps = {
    unassoc_ad_user: '域用户的名称跟钉钉用户的名称一致, 但域用户的所属部门跟钉钉用户的所属部门不一致.<br>属于必须关联但关联错误的域用户列表.',
    unrelated_ad_user: '域用户的名称未匹配钉钉用户.<br>属于无需关联钉钉的域用户列表.',
    unassoc_dd_user: '钉钉用户的名称未匹配域用户.<br>属于必须关联但关联错误的钉钉用户列表.',
    idle_term: '未设置资产责任人的天擎终端列表.',
    null_term: '天擎终端上线时未读取到主板序列号和计算机型号等信息, 产生空信息的天擎终端列表.',
    repeat_term: '更改计算机名称 或 重装系统 会上线新的天擎终端, 与之前的终端的id不匹配.<br>主板序列号重复的天擎终端列表.<br>MAC地址重复的天擎终端列表.',
    assetSN_repeat_term: '天擎终端手工登记的资产编号出现重复的的天擎终端列表.',
    idle_computer_asset: '固定资产的 台式电脑/笔记本电脑/一体机 等资产的使用人为空.<br>即未分配的电脑资产列表.',
    idle_display_asset: '固定资产的 显示器资产的使用人为空.<br>即未分配的显示器资产列表.'
}

function AddTopMouseTips() {
    let curTips = $('<div>').attr('id', 'idaas-mouseTips').addClass('idaas-mouseTips-none');
    curTips.append($('<p>').addClass('idaas-mouseTips-content'));
    curTips.append($('<i>').addClass('idaas-top-mouseTips-tips'));
    $('body').append(curTips);
    setTopMouseTips(true, false);
}

function setTopMouseTips(is_load, is_sort) {
    $('.mouseTips').mouseenter(function (e) {
        if (($(e.currentTarget).text().trim() == '-')) {
            return;
        }
        $('#idaas-mouseTips').addClass('idaas-mouseTips-block');
        let offsetTipsX = $(window).width() - (e.clientX - e.offsetX) - e.currentTarget.clientWidth - 60;
        let offsetTipsY = $(window).height() - (e.clientY - e.offsetY);
        let tipText = $(e.currentTarget).attr('data-tip');
        // console.log(e);
        // console.log('offsetTipsX: ' + offsetTipsX, 'offsetTipsY: ' + offsetTipsY);
        $('#idaas-mouseTips').css('bottom', `${offsetTipsY}px`).css('right', `${offsetTipsX}px`);
        $('#idaas-mouseTips').children('p').html(tipText);
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

function loadDashboard() {
    let layer = layui.layer;
    ApiGet('/Main/getDashboard', {
        token: CryptoJS.MD5('getMainDashboard').toString(),
        mode: 'get_maindashboard',
    }).then((res) => {
        if (res.code == 0) {
            baseData.dashboard = res.data;
            setDashboardData();
            // 悬停显示tips层-上 + mouse事件订阅 [ 2024.2 by wendr ]
            AddTopMouseTips();
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

function setDashboardData() {
    let panel_list = [$('#db_ad'), $('#db_dd'), $('#db_tq'), $('#db_itasset')];
    panel_list.forEach((panel, i) => {
        panel.empty();
        baseData.dashboard[i].forEach(db => {
            let node = `
                <div data-id="${db.title}" class="overview-box div-grid">
                    <span class="title div-inline-flex">
                        <p>${title_maps[db.title]}</p>
                        ${(db.is_link ? `<i data-tip="${tip_maps[db.title]}" class="layui-icon layui-icon-tips mouseTips"></i>` : '')}
                    </span>
                    <span class="content div-inline-flex color-normal">
                        <p class="${(db.is_link ? 'is-link' : '')}">${db.content}</p>
                    </span>
                </div>`;
            panel.append(node);
        });
        panel.find('p.is-link').click(e => { console.log(baseData.dashboard[i].filter(x => x.title == $(e.currentTarget).parent().parent().attr('data-id'))[0]); });
    });
}