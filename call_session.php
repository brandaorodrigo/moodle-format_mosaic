<?php

session_start();

if (!@$_GET['name'] || !@$_GET['value']) return;

$_SESSION[$_GET['name']] = $_GET['value'];
