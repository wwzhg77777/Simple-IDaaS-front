<?php
#
# @Author      :  ww1372247148@163.com
# @AuthorDNS   :  wendirong.top
# @CreateTime  :  2023-12-07
# @FilePath    :  footer.php
# @FileVersion :  1.0
# @FileDesc    :  template模板的 footer 页尾
#
?>

<footer id="main-footer" style="display: <?= $_REQUEST['map'] == 'main' ? 'block' : 'none' ?>;">
    <span>IDaaS简易版系统 © <?= date('Y'); ?> - <?= $WEBSRV_DNS_NAME ?></span>
</footer>