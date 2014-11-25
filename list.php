<?php
include_once("connection.php");
$query_list = "SELECT * FROM todo order by  id";
$query_list= mysql_query($query_list);
if($query_list)
{
while($result=mysql_fetch_array($query_list))
{
	echo '<li class=' . (($result[2]==1)?"completed ":"") . '><input ' . (($result[2]==1)?"checked ":"") . 'type="checkbox"  id=' . $result[0] .  '><label>' . $result[1] . '</label></li>';
}	
}
?>