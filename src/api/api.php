<?php
	
	$demo = $_GET['demo'];

	// 通过php可以访问豆瓣数据，再返回给自已前端
	$result = file_get_contents($demo);

	echo $result;




