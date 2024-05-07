<?php
#
# @Author      :  ww1372247148@163.com
# @AuthorDNS   :  wendirong.top
# @CreateTime  :  2023-12-07
# @FilePath    :  index.php
# @FileVersion :  1.2
# @LastEditTime:  2023-12-07
# @FileDesc    :  index页面
#

require_once 'config/global.php';
require_once 'config/index.php';
$isDebug = false;
if ($isDebug) exit;
if (isset($_REQUEST['map'])) {
    if (in_array($_REQUEST['map'], array_keys($tpl_var_maps))) {
        $require_target = true;
    }
}
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="description" content="IDaaS同步数据平台">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta name="format-detection" content="telephone=no,email=no,adress=no" />
    <meta content="no" name="apple-mobile-web-app-capable" />
    <meta content="black" name="apple-mobile-web-app-status-bar-style" />
    <title>IDaaS同步数据平台</title>
    <link rel="stylesheet" href="./layui/css/layui.css">
    <link rel="stylesheet" href="./css/index.css">
    <?php if (in_array($_REQUEST['map'], ['main', 'assoc_data'])) {
        echo "<link rel=\"stylesheet\" href=\"./css/page/{$_REQUEST['map']}.css\">\r\n";
    } ?>
    <link rel="stylesheet" href="./css/index_media.css">
    <!-- 移动端调试 -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/eruda"></script>
    <script>
        eruda.init();
    </script> -->
    <!-- 移动端调试  -->

</head>

<body>
    <div class="layui-layout layui-layout-admin">
        <?php require_once 'template/header.php'; // 填充header页头
        ?>
        <div class="layui-side layui-bg-black">
            <div class="layui-side-scroll">
                <ul class="layui-nav layui-nav-tree idaas-nav-tree">
                    <?php
                    foreach ($tpl_text_maps as $k => $v) {
                        echo "<li class=\"layui-nav-item layui-this\"><a href=\"?map={$k}\">{$v[0]}</a></li>\r\n";
                    }
                    ?>
                </ul>
            </div>
            <div class="nav-footer">
                <div class="toggle-bar">
                    <div class="hamburger-container" onclick="scale_lnav()">
                        <svg t="1677749691940" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2798" width="30" height="30">
                            <path d="M635.733333 490.666667l174.933334 174.933333-64 59.733333-234.666667-234.666666L746.666667 256 810.666667 315.733333l-174.933334 174.933334z m-260.266666 0l174.933333 174.933333-59.733333 59.733333L256 490.666667 490.666667 256l59.733333 59.733333-174.933333 174.933334z" fill="#cdcdcd" p-id="2799"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <?php if (isset($require_target)) { ?>
            <div class="layui-body" style="margin: 0;">
                <!-- 内容主体区域 -->
                <?php if (in_array($_REQUEST['map'], ['main', 'assoc_data'])) {
                    require_once "components/{$_REQUEST['map']}/page.php";
                } else {
                ?>
                    <div id="body_main">
                        <table id="<?= $tpl_var_maps[$_REQUEST['map']][0]; ?>" lay-filter="tableEvent"></table>

                        <script type="text/html" id="<?= $tpl_var_maps[$_REQUEST['map']][0]; ?>_toolbar">
                            <div class="idaas-cls-toolbar-left">
                                <?php if ($_REQUEST['map'] == 'sync_data') { ?>
                                    <button class="layui-btn layui-btn-sm tool-submit-button" style="font-size: 14px;border-radius: 3px;border-color: #686868;" lay-event="executeSync">执行数据同步</button>
                                <?php } else if ($_REQUEST['map'] == 'search_data') { ?>
                                    <div class="layui-inline">
                                        <label style="padding: 9px;font-weight: bold;text-align: right;">条件搜索:</label>
                                        <div style="display: inline-block;width: 100px;">
                                            <select name="selectTimeStatus" id="selectTimeStatus" lay-verify="required" lay-filter="searchTimeStatus">
                                                <option value="curr">实时数据</option>
                                                <option value="prev">历史数据</option>
                                            </select>
                                        </div>
                                        <div class="idaas-search-cls-select-time" style="width: 100px;">
                                            <input type="text" autocomplete="off" id="selectTime" class="layui-input" placeholder="yyyy-MM-dd" readonly>
                                        </div>
                                        <div style="display: inline-block;width: 160px;">
                                            <select name="selectCol" id="selectCol" lay-verify="required" lay-filter="searchColumn">
                                            </select>
                                        </div>
                                        <div style="display: inline-block;">
                                            <select name="selectVal" id="selectVal" lay-verify="required" lay-search="" lay-filter="searchValue">
                                                <option value="">搜索/选择</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button class="layui-btn layui-btn-sm tool-temp-button btn-normal" style="margin-left: 20px;" lay-event="searchReset">重置</button>

                                <?php } ?>
                            </div>
                            <div class="idaas-cls-toolbar-right">
                                <?php if ($_REQUEST['map'] == 'sync_data') { ?>
                                    <button class="layui-btn layui-btn-sm tool-temp-button btn-normal" lay-event="confirmAll">确认(全选)</button>
                                    <button class="layui-btn layui-btn-sm tool-temp-button btn-normal" lay-event="deferAll">暂缓(全选)</button>
                                <?php } ?>
                                <button class="layui-btn layui-btn-sm tool-temp-button tool-opacity" lay-event="LAYTABLE_COLS">筛选列</button>
                                <button class="layui-btn layui-btn-sm tool-temp-button tool-opacity" lay-event="exportFile">导出</button>
                                <?php if ($_REQUEST['map'] == 'sync_data') { ?>
                                    <button class="layui-btn layui-btn-sm tool-temp-button tool-opacity" lay-event="syncLocalData">同步本地数据库</button>
                                    <button class="layui-btn layui-btn-sm tool-temp-button tool-opacity" lay-event="getLocalData">获取最新数据</button>
                                <?php } ?>
                            </div>
                        </script>
                    </div>
            </div>
    <?php }
            } else {
                echo "<div class=\"layui-body\">\r\n\t";
                echo "<h1 style=\"margin-top: 50px;margin-left: 50px;\">请点击左边的标签查看详细内容</h1>\r\n\t";
                echo '</div>';
            }
            require_once 'template/footer.php'; // 填充footer页尾
    ?>
    </div>
    <?php if ($_REQUEST['map'] == 'sync_data') {
        require_once 'template/forms.php'; // 填充form表单元素
    } ?>
    <?php if ($_REQUEST['map'] == 'assoc_data') {
        require_once 'template/contextmenu.php'; // 填充右键菜单元素
    } ?>

    <script>
        localStorage.clear();
        sessionStorage.clear();
        const API_URI_SCHEME_HOST = '<?= $API_URI_SCHEME_HOST ?>';
        const DINGTALK_CORPID = '<?= $DINGTALK_CORPID ?>';
        const isDebug = false;
    </script>

    <script src="./js/dingtalk.open.js"></script>
    <script src="./js/api.js"></script>
    <script src="./js/dd_login.js"></script>
    <script src="./layui/layui.js"></script>
    <script src="./js/main.js"></script>
    <script src="./js/utils.js"></script>
    <script src="./js/index.js"></script>
    <?php if (in_array($_REQUEST['map'], ['main', 'assoc_data'])) {
        echo "<script src=\"./js/page/{$_REQUEST['map']}.js\"></script>\r\n";
    } ?>
    <script src="./js/jquery.min.js"></script>
    <script src="./js/jquery.base64.js"></script>
    <script src="./js/crypto-js.min.js"></script>
    <script src="./js/moment.min.js"></script>
    <script>
        // 高亮选中的树节点
        <?php if (isset($require_target)) { ?>
            $($('.idaas-nav-tree').children('li')[<?= array_search($_REQUEST['map'], array_keys($tpl_text_maps)); ?>]).addClass('idaas-nav-tree-active');
        <?php } ?>

        async function main() {
            if (dd.env.platform !== "notInDingTalk") {
                retDingtalkAuth = await dd_onload(DINGTALK_CORPID);
                scale_lnav();
                console.log('retDingtalkAuth:', retDingtalkAuth);
            }
            <?php
            if (in_array($_SERVER['REMOTE_ADDR'], $pass_iplists)) {
                echo "else {\r\n";
                if ($isDebug) echo "console.log('web login. current ip: {$_SERVER['REMOTE_ADDR']}.');";
                echo "retDingtalkAuth = {
          auth: true
      };";
                echo "\r\n}";
            } else {
                echo "else {
        retDingtalkAuth = {
          auth: false,
          code: 4001041,
          msg: '非钉钉环境，拒绝访问'
        };
      }";
            }
            if (isset($require_target)) { ?>
                layer.load(2, {
                    time: 1 * 1000
                });
            <?php } ?>
            setTimeout(() => {
                <?php if (isset($require_target)) { ?>
                    // layui 模块化table [ 2023.5 by wendr ]
                    layui.use(['table', 'form', 'layer', 'laydate', 'laypage', 'laytpl', 'tree', 'util', 'element', 'dropdown', 'flow', 'jquery'], () => {
                        let table = layui.table,
                            form = layui.form,
                            layer = layui.layer,
                            laydate = layui.laydate,
                            laypage = layui.laypage,
                            laytpl = layui.laytpl,
                            tree = layui.tree,
                            util = layui.util,
                            element = layui.element,
                            dropdown = layui.dropdown,
                            flow = layui.flow,
                            $ = layui.jquery;

                        if (retDingtalkAuth.auth) {
                            // dingtalk平台添加用户信息到右上角 [ 2023.5 by wendr ]
                            $('.dingtalk-info-name').text(retDingtalkAuth.name);
                            <?php
                            if ($_REQUEST['map'] == 'assoc_data') {
                            ?>
                                $('#body_main').css('display', 'flex');
                                // 加载树形组件 [ 2024.2 by wendr ]
                                loadTreeData(tree, '#deptListTree');

                            <?php } else if ($_REQUEST['map'] == 'main') {
                            ?>
                                $('#body_main').css('display', 'block');
                                $('#main-footer').css('display', 'flex');
                                // 加载dashboard数据 [ 2024.2 by wendr ]
                                loadDashboard();

                            <?php } else { ?>
                                table.render({
                                    elem: '#<?= $tpl_var_maps[$_REQUEST['map']][0]; ?>',
                                    title: '<?= $tpl_text_maps[$_REQUEST['map']][1]; ?>',
                                    height: 'full-60',
                                    toolbar: '#<?= $tpl_var_maps[$_REQUEST['map']][0] ?>_toolbar',
                                    defaultToolbar: [],
                                    url: `${API_URI_SCHEME_HOST}/<?= $tpl_var_maps[$_REQUEST['map']][1] ?>`,
                                    method: 'get',
                                    where: {
                                        token: CryptoJS.MD5('token_get_<?= $_REQUEST['map']; ?>').toString(),
                                        mode: '<?= $tpl_var_maps[$_REQUEST['map']][1] ?>',
                                    },
                                    page: {
                                        groups: 10
                                    },
                                    limit: 30,
                                    limits: [30, 50, 100, 300, 500, 1000],
                                    size: 'lg',
                                    escape: true,
                                    cols: <?= $tpl_var_maps[$_REQUEST['map']][2]; ?>,
                                    parseData: (res) => {
                                        return {
                                            "code": res.code,
                                            "msg": res.msg,
                                            "count": res.count,
                                            "data": res.data,
                                            "fullData": res.fullData,
                                        };
                                    },
                                    done: (res, curr, count) => {
                                        // layui 统计临时数据 [ 2023.12 by wendr ]
                                        baseData.datas = deepClone(res.data);
                                        if (typeof res.fullData !== 'undefined') {
                                            baseData.fullDatas = deepClone(res.fullData);

                                            <?php if ($_REQUEST['map'] == 'search_data') { ?>
                                                searchTimeStatus('curr', true);
                                            <?php } ?>

                                        }
                                        // laypage组件添加 当前选择n行 [ 2023.5 by wendr ]
                                        pageAddCount('<?= $tpl_var_maps[$_REQUEST['map']][0]; ?>');

                                        // 悬停显示tips层-右 + mouse事件订阅 [ 2023.12 by wendr ]
                                        AddRightMouseTips();
                                    }
                                });
                                // 表格内部事件 [ 2023.5 by wendr ]
                                table.on('tool(tableEvent)', (obj) => {
                                    switch (obj.event) {
                                        case 'show-info':
                                            showInfoInCell(obj);
                                            break;

                                            <?php if ($_REQUEST['map'] == 'sync_data') { ?>

                                            case 'update-row':
                                                updateRowInCell(obj);
                                                break;
                                            case 'action-confirm':
                                                setActionInCell(true, obj);
                                                break;
                                            case 'action-defer':
                                                setActionInCell(false, obj);
                                                break;
                                            case 'action-ignore':
                                                IgnoreInRow(obj, Object.keys(layui.table.cache)[0]);
                                                break;

                                            <?php } ?>

                                        default:
                                            break;
                                    }
                                });
                                // 表格工具栏事件 [ 2023.5 by wendr ]
                                table.on('toolbar(tableEvent)', (obj) => {
                                    let checkStatus = table.checkStatus(obj.config.id);
                                    switch (obj.event) {
                                        case 'exportFile':
                                            if (checkStatus['data'].length > 0) {
                                                table.exportFile(obj.config.id, checkStatus.data, 'xls');
                                            } else {
                                                layer.alert('请选择需要导出的数据。');
                                            }
                                            break;

                                            <?php if ($_REQUEST['map'] == 'sync_data') { ?>
                                            case 'executeSync':
                                                if (checkStatus['data'].length > 0) {
                                                    let chooseData = baseData.datas.filter(x => checkStatus.data.map(d => d.Id).includes(x.Id));
                                                    // console.log('choose:', chooseData);
                                                    if (chooseData.filter(x => x.action != -1).length == checkStatus.data.length) {
                                                        layer.confirm('确认 执行数据同步？', {
                                                            btn: ['确认', '取消']
                                                        }, function() {
                                                            onExecuteSync(obj, chooseData);
                                                        }, function() {
                                                            onExecuteSyncQuit(obj, chooseData);
                                                        });
                                                    } else {
                                                        layer.alert('存在 未确认操作的 选中行。');
                                                    }
                                                } else {
                                                    layer.alert('请选择 行数据。');
                                                }
                                                break;
                                            case 'confirmAll':
                                                setActionAll(true);
                                                break;
                                            case 'deferAll':
                                                setActionAll(false);
                                                break;
                                            case 'syncLocalData':
                                                syncLocalData();
                                                break;
                                            case 'getLocalData':
                                                getLocalData();
                                                break;
                                            <?php } else if ($_REQUEST['map'] == 'search_data') { ?>
                                            case 'searchReset':
                                                searchReset(obj, CryptoJS.MD5('token_get_<?= $_REQUEST['map']; ?>').toString(), 'getSearchData');
                                                break;
                                            <?php } ?>

                                        default:
                                            break;
                                    }
                                });
                                // 表格复选框事件 [ 2023.5 by wendr ]
                                table.on('checkbox(tableEvent)', (obj) => {
                                    switch (obj.type) {
                                        case 'all':
                                            obj.checked ? $('tbody tr').addClass('layui-table-click') : $('tbody tr').removeClass('layui-table-click');
                                            break;
                                        case 'one':
                                            obj.checked ? $(obj.tr).addClass('layui-table-click') : $(obj.tr).removeClass('layui-table-click');
                                            break;
                                    }
                                    let checkStatus = table.checkStatus('<?= $tpl_var_maps[$_REQUEST['map']][0] ?>');
                                    $('#idaas-dom-selectRows').text(`当前已选择 ${checkStatus['data'].length} 行`);
                                });
                                // 表格排序事件 [ 2023.12 by wendr ]
                                table.on('sort(tableEvent)', (obj) => {
                                    setRightMouseTips(true, true);
                                });
                                // 日期选择 [ 2024.1 by wendr ]
                                laydate.render({
                                    elem: '#selectTime',
                                    trigger: 'click',
                                    min: '2020-01-01',
                                    max: moment().format('YYYY-MM-DD'),
                                    value: new Date(),
                                    btns: ['now', 'confirm'],
                                    done: (value, date) => {
                                        baseData.searchTime = value;
                                        getHistoryDingInfo(baseData.searchTime);
                                    }
                                });
                                // 工具组件-表单按钮事件 [ 2023.12 by wendr ]
                                util.event('lay-on', {
                                    frmUpdateReset: othis => {
                                        form.val('frmUpdateRow', {
                                            domain_desc: baseData.datas[baseData.updated.update_Id - 1].desc
                                        });
                                    }
                                });
                                // 表单组件-表单submit事件 [ 2023.12 by wendr ]
                                form.on('submit(frmUpdateSubmit)', data => {
                                    frmUpdateSubmit(data);
                                    return false;
                                });
                                // 表单组件-表单工具栏select事件 [ 2024.1 by wendr ]
                                form.on('select(searchTimeStatus)', data => {
                                    searchTimeStatus(data.value, true);
                                });
                                form.on('select(searchColumn)', data => {
                                    searchColumn(data.value);
                                });
                                form.on('select(searchValue)', data => {
                                    searchValue('<?= $tpl_var_maps[$_REQUEST['map']][0] ?>', data.value);
                                    return false;
                                });
                            <?php } ?>
                        } else {
                            $('#body_main').remove();
                            let iframe = document.createElement('iframe');
                            switch (retDingtalkAuth.code) {
                                case 4001041:
                                    iframe.src = '401.html?a=1';
                                    break;

                                case 4001042:
                                    iframe.src = '401.html?a=2';
                                    break;

                                case 500:
                                    iframe.src = '500.html';
                                    break;

                                default:
                                    iframe.src = '404.html';
                                    break;
                            }
                            iframe.className = 'ins-iframe-body';
                            $('.layui-body').append(iframe);
                        }
                    });
                <?php } ?>
            }, 1000);
        }
        main();
    </script>
    <!-- layui_templet 模板引擎 [ 2023.3 by wendr ] -->
    <?php
    if (isset($require_target)) {
        require_once "components/{$_REQUEST['map']}/templet.php";    // 填充component模块对应的layui_templet模板引擎
    }
    ?>
</body>

</html>