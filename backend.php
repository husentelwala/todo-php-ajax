<?php
include_once("connection.php");
if(isset($_POST['name']))
{
	$todo=$_POST['name'];
	$query="INSERT INTO `test`.`todo` (
	`id` ,
	`todo` ,
	`status`
	)
	VALUES (
	NULL , '$todo', ''
	)";
	mysql_query($query);
	echo mysql_insert_id();
}
?>