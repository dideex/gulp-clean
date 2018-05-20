<?php 
	$from = "info@yandextaxi.org";
	$headers = "From: ".$from."\r\nReply-to: ".$from."\r\nContent-type: text/plain; charset=utf-8";

	$theme = "Phone: ".$_POST['phone'];

	$letter ="Phone: ".$_POST['phone']."\r\n";
	if(!empty($_POST['fio'])) $letter .="Name: ".$_POST['fio']."\r\n";

	echo $letter ."\r\n";
	if (mail("wc34fun@mail.ru", $theme, $letter, $headers)){
		echo "fine";
		header("Location: /index.php");
	} else {
		echo "error";
		//header("Location: /testform");
	}

//} else {
	//header("Location: /testform");
//}

?>