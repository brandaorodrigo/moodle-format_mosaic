<?php

session_start();

if (!@$_GET['name']) return;

$_SESSION[$_GET['name']] = @$_GET['value'];

var_dump($_SESSION);
