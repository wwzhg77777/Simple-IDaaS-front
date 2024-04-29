/*
 * @Author      :  ww1372247148@163.com
 * @AuthorDNS   :  wendirong.top
 * @CreateTime  :  2023-12-07
 * @FilePath    :  main.js
 * @FileVersion :  1.0
 * @FileDesc    :  全局通用的js函数集
*/

var searchUserData_table_cols = [
    [
        {
            type: 'checkbox',
            fixed: 'left',
            width: 50,
            rowspan: 2,
        },
        {
            field: 'Id',
            title: '序号',
            width: 50,
            align: 'center',
            unresize: true,
            rowspan: 2,
            templet: '#idaas-search-tpl-Id'
        }, {
            field: 'objGUID',
            title: 'ObjectGUID',
            width: 100,
            align: 'center',
            rowspan: 2,
            templet: '#idaas-search-tpl-objGUID'
        }, {
            field: 'type',
            title: '类型',
            width: 100,
            align: 'center',
            unresize: true,
            sort: true,
            rowspan: 2,
            templet: '#idaas-search-tpl-type'
        }, {
            title: 'AD域控信息',
            align: 'center',
            colspan: 4
        }, {
            title: '钉钉通讯录信息',
            align: 'center',
            colspan: 5
        }, {
            title: '更多信息',
            align: 'center',
            fixed: 'right',
            unresize: true,
            rowspan: 2,
            templet: '#idaas-search-tpl-show-info'
        }
    ],
    [
        {
            field: 'cn',
            title: '域用户(cn)',
            width: 140,
            align: 'center',
            sort: true,
            templet: '#idaas-search-tpl-cn'
        }, {
            field: 'ou',
            title: '域OU组',
            width: 140,
            align: 'center',
            sort: true,
            templet: '#idaas-search-tpl-ou'
        }, {
            field: 'desc',
            title: '描述',
            width: 80,
            align: 'center',
            templet: '#idaas-search-tpl-desc'
        }, {
            field: 'enabled',
            title: '是否启用',
            width: 80,
            align: 'center',
            sort: true,
            templet: '#idaas-search-tpl-enabled'
        }, {
            field: 'userName',
            title: '姓名(userName)',
            width: 140,
            align: 'center',
            sort: true,
            templet: '#idaas-search-tpl-userName'
        }, {
            field: 'dept',
            title: '部门',
            width: 140,
            align: 'center',
            sort: true,
            templet: '#idaas-search-tpl-dept'
        }, {
            field: 'position',
            title: '职位',
            width: 140,
            align: 'center',
            templet: '#idaas-search-tpl-position'
        }, {
            field: 'jobNumber',
            title: '工号',
            width: 120,
            align: 'center',
            templet: '#idaas-search-tpl-jobNumber'
        }, {
            field: 'email',
            title: '企业邮箱',
            width: 120,
            align: 'center',
            templet: '#idaas-search-tpl-email'
        }
    ]
];

var syncData_table_cols = [
    [
        {
            type: 'checkbox',
            fixed: 'left',
            width: 50,
            rowspan: 2,
        },
        {
            field: 'Id',
            title: '序号',
            width: 50,
            align: 'center',
            unresize: true,
            rowspan: 2,
            templet: '#idaas-sync-tpl-Id'
        }, {
            field: 'objGUID',
            title: 'ObjectGUID',
            width: 100,
            align: 'center',
            hide: true,
            rowspan: 2,
            templet: '#idaas-sync-tpl-objGUID'
        }, {
            title: 'AD域控信息',
            align: 'center',
            colspan: 5
        }, {
            title: '钉钉通讯录信息',
            align: 'center',
            colspan: 5
        }, {
            title: '更多信息',
            width: 60,
            align: 'center',
            unresize: true,
            rowspan: 2,
            templet: '#idaas-sync-tpl-show-info'
        }, {
            field: 'type',
            title: '类型',
            width: 60,
            align: 'center',
            unresize: true,
            sort: true,
            rowspan: 2,
            templet: '#idaas-sync-tpl-type'
        }, {
            field: 'method',
            title: '执行动作',
            width: 130,
            align: 'center',
            unresize: true,
            sort: true,
            rowspan: 2,
            templet: '#idaas-sync-tpl-method'
        }, {
            title: '操作',
            width: 220,
            align: 'center',
            unresize: true,
            rowspan: 2,
            templet: '#idaas-sync-tpl-action'
        }, {
            title: '编辑',
            minWidth: 70,
            fixed: 'right',
            align: 'center',
            unresize: true,
            rowspan: 2,
            templet: '#idaas-sync-tpl-update-row'
        }
    ],
    [
        {
            field: 'cn',
            title: '域用户(cn)',
            width: 110,
            align: 'center',
            sort: true,
            templet: '#idaas-sync-tpl-cn'
        }, {
            field: 'ou',
            title: '域OU组',
            width: 120,
            align: 'center',
            sort: true,
            templet: '#idaas-sync-tpl-ou'
        }, {
            field: 'secgroup',
            title: '域安全组',
            width: 120,
            align: 'center',
            sort: true,
            templet: '#idaas-sync-tpl-secgroup'
        }, {
            field: 'desc',
            title: '描述',
            width: 80,
            align: 'center',
            templet: '#idaas-sync-tpl-desc'
        }, {
            field: 'enabled',
            title: '是否启用',
            width: 80,
            align: 'center',
            sort: true,
            templet: '#idaas-sync-tpl-enabled'
        }, {
            field: 'userName',
            title: '姓名(userName)',
            width: 120,
            align: 'center',
            sort: true,
            templet: '#idaas-sync-tpl-userName'
        }, {
            field: 'dept',
            title: '部门',
            width: 120,
            align: 'center',
            sort: true,
            templet: '#idaas-sync-tpl-dept'
        }, {
            field: 'position',
            title: '职位',
            width: 120,
            align: 'center',
            templet: '#idaas-sync-tpl-position'
        }, {
            field: 'jobNumber',
            title: '工号',
            width: 90,
            align: 'center',
            templet: '#idaas-sync-tpl-jobNumber'
        }, {
            field: 'email',
            title: '企业邮箱',
            width: 90,
            align: 'center',
            templet: '#idaas-sync-tpl-email'
        }
    ]
];

var sysAudit_table_cols = [
    [
        {
            field: 'time',
            title: '时间',
            width: 220,
            align: 'center',
            sort: true,
            rowspan: 3,
            style: 'font-size: 18px;font-weight: bolder;font-family: consolas;color: #181818;',
        }, {
            title: '内容',
            align: 'center',
            colspan: 10
        }, {
            field: 'method',
            title: '动作',
            width: 130,
            align: 'center',
            rowspan: 3,
            templet: '#idaas-sys-audit-tpl-method',
        }, {
            field: 'type',
            title: '用户类型',
            width: 100,
            align: 'center',
            sort: true,
            rowspan: 3,
            templet: '#idaas-sys-audit-tpl-type',
        }, {
            field: 'admin',
            title: '操作人',
            width: 100,
            align: 'center',
            sort: true,
            rowspan: 3,
            style: 'font-size: 16px;font-weight: bolder;font-family: consolas;color: #181818;',
        }, {
            field: 'action',
            title: '操作',
            align: 'center',
            fixed: 'right',
            sort: true,
            rowspan: 3,
            style: 'font-size: 16px;font-weight: bolder;font-family: consolas;color: #fff;background-color: #ff5722;',
        },
    ],
    [
        {
            title: 'AD域控信息',
            align: 'center',
            colspan: 5
        }, {
            title: '钉钉通讯录信息',
            align: 'center',
            colspan: 5
        }
    ],
    [
        {
            field: 'cn',
            title: '域用户(cn)',
            width: 110,
            align: 'center',
            templet: '#idaas-sync-tpl-cn'
        }, {
            field: 'ou',
            title: '域OU组',
            width: 120,
            align: 'center',
            templet: '#idaas-sync-tpl-ou'
        }, {
            field: 'secgroup',
            title: '域安全组',
            width: 120,
            align: 'center',
            templet: '#idaas-sync-tpl-secgroup'
        }, {
            field: 'desc',
            title: '描述',
            width: 80,
            align: 'center',
            templet: '#idaas-sync-tpl-desc'
        }, {
            field: 'enabled',
            title: '是否启用',
            width: 80,
            align: 'center',
            templet: '#idaas-sync-tpl-enabled'
        }, {
            field: 'userName',
            title: '姓名(userName)',
            width: 120,
            align: 'center',
            templet: '#idaas-sync-tpl-userName'
        }, {
            field: 'dept',
            title: '部门',
            width: 120,
            align: 'center',
            templet: '#idaas-sync-tpl-dept'
        }, {
            field: 'position',
            title: '职位',
            width: 120,
            align: 'center',
            templet: '#idaas-sync-tpl-position'
        }, {
            field: 'jobNumber',
            title: '工号',
            width: 100,
            align: 'center',
            templet: '#idaas-sync-tpl-jobNumber'
        }, {
            field: 'email',
            title: '企业邮箱',
            width: 100,
            align: 'center',
            templet: '#idaas-sync-tpl-email'
        }
    ]
];
