<?php
include_once("connection.php");
if(isset($_POST['delete_id']))
{
	$id=$_POST['delete_id'];
	$id=implode($id,',');	
	$query="DELETE FROM todo where id in ($id)";
	mysql_query($query);
}
?>