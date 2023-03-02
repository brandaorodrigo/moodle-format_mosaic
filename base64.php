<?php

require_once("../../../config.php");
require_once("../../lib.php");

if (!@$_GET['id'] || !$_GET['name']) die();

$base64 = $DB->get_field('course_format_options', 'value', ['name' => $_GET['name'], 'courseid' => $_GET['id']], MUST_EXIST);

$explode = explode(';base64,', $base64);

header('Cache-Control: public, max-age=86400');
header('Pragma: cache');
header('Expires: ' . date('D, d M Y H:i:s', strtotime("+1 day", time())) . ' GMT');
header('Last-Modified: ' . date('D, d M Y H:i:s') . ' GMT');
header('Content-Transfer-Encoding: binary');
header('Content-Type: ' . str_replace('data:', '', $explode[0]));

echo base64_decode($explode[1]);
