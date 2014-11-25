<?php
$id=$_POST['check_id'];
$con = mysql_connect("localhost","root","");
mysql_select_db('test',$con);
echo $query="UPDATE todo set status = NOT status where id='$id'";
mysql_query($query);

?>