<?php
include_once("connection.php");
if(isset($_POST['update_id']))
{
	$id=$_POST['update_id'];
	$todo_item_text=$_POST['todo_item_text'];
	$query="UPDATE todo SET todo = '$todo_item_text' WHERE id ='$id'";
	mysql_query($query);
}

?>