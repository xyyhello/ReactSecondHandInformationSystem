<?php
	$conn = mysql_connect("localhost","root","123456");
	mysql_db_query("microblog_sys", $conn);
	mysql_query("SET NAMES UTF8");
?>