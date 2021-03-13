<?php
	// Credit to https://gist.github.com/kylejson/9716881 for this uploading code
    define('UPLOAD_DIR', './pics/');
    $img = $_POST['imgBase64'];
    $name = $_POST['imgName'];
	$img = str_replace('data:image/png;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
	$file = UPLOAD_DIR . $name . '.png';
	$success = file_put_contents($file, $data);
	//send request to ocr 

	print $success ? $file : 'Failed';
?>
