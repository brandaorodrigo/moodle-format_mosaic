<?php

header('Cache-Control: public, max-age=86400');
header('Pragma: cache');
header('Expires: ' . date('D, d M Y H:i:s', strtotime("+1 day", time())) . ' GMT');
header('Last-Modified: ' . date('D, d M Y H:i:s') . ' GMT');
header('Content-Transfer-Encoding: binary');
header('Content-type: text/css');
echo base64_decode($_GET['css']);
