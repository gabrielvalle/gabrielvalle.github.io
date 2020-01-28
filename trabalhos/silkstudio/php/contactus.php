<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'phpmailer/PHPMailerAutoload.php';


// check if any of the inputs are empty
// if ($_POST['options_produto_camisa'] || $_POST['options_produto_bone']) {
//     $data = array(
//     	'success' => false,
//     	'message' => 'Please fill out the form completely.',
//     	'checkCamisa' => (isset($_POST['options_produto_camisa']) ? true : false),
//     	'checkBone' => (isset($_POST['options_produto_bone']) ? true : false)
// 	);
//     echo json_encode($data);
//     exit;
// }

$corpo_email = '';
$corpo_email .= "Name: " . $_POST['inputName'];
$corpo_email .= "\r\n\r\n";
$corpo_email .= "Email: " . $_POST['inputEmail'];
$corpo_email .= "\r\n\r\n";
$corpo_email .= "Telefone: " . $_POST['inputTelefone'];
$corpo_email .= "\r\n\r\n";
$corpo_email .= "Celular: " . $_POST['inputCelular'];
$corpo_email .= "\r\n\r\n";
$corpo_email .= "Mensagem: " . stripslashes($_POST['inputMessage']);
$corpo_email .= "\r\n\r\n";
$corpo_email .= "Pedido de Orcamento para:";
$corpo_email .= "\r\n\r\n";

// CAMISAS
if (isset($_POST['options_produto_camisa']) == 1) {
	$corpo_email .= "- Camisas:";
	$corpo_email .= "\r\n\r\n";

	if (isset($_POST['options_malha_dryfit']) == 1) {
		$corpo_email .= "-- Dryfit - Tamanho e Quantidade: ";
		$corpo_email .= "\r\n\r\n";

		if (isset($_POST['opt_dryfit_p']) == 1) {
			$corpo_email .= $_POST['opt_dryfit_p'] . " : " . $_POST['opt_dryfit_p_length'];
			$corpo_email .= "\r\n\r\n";
		}

		if (isset($_POST['opt_dryfit_m']) == 1) {
			$corpo_email .= $_POST['opt_dryfit_m'] . " : " . $_POST['opt_dryfit_m_length'];
			$corpo_email .= "\r\n\r\n";
		}

		if (isset($_POST['opt_dryfit_g1']) == 1) {
			$corpo_email .= $_POST['opt_dryfit_g1'] . " : " . $_POST['opt_dryfit_g1_length'];
			$corpo_email .= "\r\n\r\n";
		}

		if (isset($_POST['opt_dryfit_g2']) == 1) {
			$corpo_email .= $_POST['opt_dryfit_g2'] . " : " . $_POST['opt_dryfit_g2_length'];
			$corpo_email .= "\r\n\r\n";
		}

		// COSTURA
		if (isset($_POST['options_costura_dryfit']) == 1) {
			$corpo_email .= "Costura Dryfit" . " : " . $_POST['options_costura_dryfit'];
			$corpo_email .= "\r\n\r\n";
		}

		// IMPRESSAO
		if (isset($_POST['options_impressao_dryfit']) == 1) {
			$corpo_email .= "Impressao Dryfit" . " : " . $_POST['options_impressao_dryfit'];
			$corpo_email .= "\r\n\r\n";
		}

		// GOLA
		if (isset($_POST['options_gola_dryfit']) == 1) {
			$corpo_email .= "Tipo de Gola Dryfit" . " : " . $_POST['options_gola_dryfit'];
			$corpo_email .= "\r\n\r\n";
		}

	}

	if (isset($_POST['options_malha_50_50']) == 1) {
		$corpo_email .= "-- 50% Algodao 50% Poliester - Tamanho e Quantidade: ";
		$corpo_email .= "\r\n\r\n";

		if (isset($_POST['opt_50_50_p']) == 1) {
			$corpo_email .= $_POST['opt_50_50_p'] . " : " . $_POST['opt_50_50_p_length'];
			$corpo_email .= "\r\n\r\n";
		}

		if (isset($_POST['opt_50_50_m']) == 1) {
			$corpo_email .= $_POST['opt_50_50_m'] . " : " . $_POST['opt_50_50_m_length'];
			$corpo_email .= "\r\n\r\n";
		}

		if (isset($_POST['opt_50_50_g1']) == 1) {
			$corpo_email .= $_POST['opt_50_50_g1'] . " : " . $_POST['opt_50_50_g1_length'];
			$corpo_email .= "\r\n\r\n";
		}

		if (isset($_POST['opt_50_50_g2']) == 1) {
			$corpo_email .= $_POST['opt_50_50_g2'] . " : " . $_POST['opt_50_50_g2_length'];
			$corpo_email .= "\r\n\r\n";
		}

		// COSTURA
		if (isset($_POST['options_costura_poliviscose']) == 1) {
			$corpo_email .= "Costura Poliviscose" . " : " . $_POST['options_costura_poliviscose'];
			$corpo_email .= "\r\n\r\n";
		}

		// IMPRESSAO
		if (isset($_POST['options_impressao_poliviscose']) == 1) {
			$corpo_email .= "Impressao Poliviscose" . " : " . $_POST['options_impressao_poliviscose'];
			$corpo_email .= "\r\n\r\n";
		}

		// GOLA
		if (isset($_POST['options_gola_poliviscose']) == 1) {
			$corpo_email .= "Tipo de Gola Poliviscose" . " : " . $_POST['options_gola_poliviscose'];
			$corpo_email .= "\r\n\r\n";
		}

	}

	if (isset($_POST['options_malha_poliester']) == 1) {
		$corpo_email .= "-- 100% Poliester - Tamanho e Quantidade: ";
		$corpo_email .= "\r\n\r\n";

		if (isset($_POST['opt_poliester_p']) == 1) {
			$corpo_email .= $_POST['opt_poliester_p'] . " : " . $_POST['opt_poliester_p_length'];
			$corpo_email .= "\r\n\r\n";
		}

		if (isset($_POST['opt_poliester_m']) == 1) {
			$corpo_email .= $_POST['opt_poliester_m'] . " : " . $_POST['opt_poliester_m_length'];
			$corpo_email .= "\r\n\r\n";
		}

		if (isset($_POST['opt_poliester_g1']) == 1) {
			$corpo_email .= $_POST['opt_poliester_g1'] . " : " . $_POST['opt_poliester_g1_length'];
			$corpo_email .= "\r\n\r\n";
		}

		if (isset($_POST['opt_poliester_g2']) == 1) {
			$corpo_email .= $_POST['opt_poliester_g2'] . " : " . $_POST['opt_poliester_g2_length'];
			$corpo_email .= "\r\n\r\n";
		}

		// COSTURA
		if (isset($_POST['options_costura_poliester']) == 1) {
			$corpo_email .= "Costura Poliester" . " : " . $_POST['options_costura_poliester'];
			$corpo_email .= "\r\n\r\n";
		}

		// IMPRESSAO
		if (isset($_POST['options_impressao_poliester']) == 1) {
			$corpo_email .= "Impressao Poliester" . " : " . $_POST['options_impressao_poliester'];
			$corpo_email .= "\r\n\r\n";
		}

		// GOLA
		if (isset($_POST['options_gola_poliester']) == 1) {
			$corpo_email .= "Tipo de Gola Poliester" . " : " . $_POST['options_gola_poliester'];
			$corpo_email .= "\r\n\r\n";
		}

	}

	if (isset($_POST['options_malha_poliamida']) == 1) {
		$corpo_email .= "-- Poliamida - Tamanho e Quantidade: ";
		$corpo_email .= "\r\n\r\n";

		if (isset($_POST['opt_poliamida_p']) == 1) {
			$corpo_email .= $_POST['opt_poliamida_p'] . " : " . $_POST['opt_poliamida_p_length'];
			$corpo_email .= "\r\n\r\n";
		}

		if (isset($_POST['opt_poliamida_m']) == 1) {
			$corpo_email .= $_POST['opt_poliamida_m'] . " : " . $_POST['opt_poliamida_m_length'];
			$corpo_email .= "\r\n\r\n";
		}

		if (isset($_POST['opt_poliamida_g1']) == 1) {
			$corpo_email .= $_POST['opt_poliamida_g1'] . " : " . $_POST['opt_poliamida_g1_length'];
			$corpo_email .= "\r\n\r\n";
		}

		if (isset($_POST['opt_poliamida_g2']) == 1) {
			$corpo_email .= $_POST['opt_poliamida_g2'] . " : " . $_POST['opt_poliamida_g2_length'];
			$corpo_email .= "\r\n\r\n";
		}

		// COSTURA
		if (isset($_POST['options_costura_poliamida']) == 1) {
			$corpo_email .= "Costura Poliamida" . " : " . $_POST['options_costura_poliamida'];
			$corpo_email .= "\r\n\r\n";
		}

		// IMPRESSAO
		if (isset($_POST['options_impressao_poliamida']) == 1) {
			$corpo_email .= "Impressao Poliamida" . " : " . $_POST['options_impressao_poliamida'];
			$corpo_email .= "\r\n\r\n";
		}

		// GOLA
		if (isset($_POST['options_gola_poliamida']) == 1) {
			$corpo_email .= "Tipo de Gola Poliamida" . " : " . $_POST['options_gola_poliamida'];
			$corpo_email .= "\r\n\r\n";
		}

	}

	if (isset($_POST['options_malha_algodao']) == 1) {
		$corpo_email .= "-- Algodao - Tamanho e Quantidade: ";
		$corpo_email .= "\r\n\r\n";

		if (isset($_POST['opt_algodao_p']) == 1) {
			$corpo_email .= $_POST['opt_algodao_p'] . " : " . $_POST['opt_algodao_p_length'];
			$corpo_email .= "\r\n\r\n";
		}

		if (isset($_POST['opt_algodao_m']) == 1) {
			$corpo_email .= $_POST['opt_algodao_m'] . " : " . $_POST['opt_algodao_m_length'];
			$corpo_email .= "\r\n\r\n";
		}

		if (isset($_POST['opt_algodao_g1']) == 1) {
			$corpo_email .= $_POST['opt_algodao_g1'] . " : " . $_POST['opt_algodao_g1_length'];
			$corpo_email .= "\r\n\r\n";
		}

		if (isset($_POST['opt_algodao_g2']) == 1) {
			$corpo_email .= $_POST['opt_algodao_g2'] . " : " . $_POST['opt_algodao_g2_length'];
			$corpo_email .= "\r\n\r\n";
		}

		// COSTURA
		if (isset($_POST['options_costura_algodao']) == 1) {
			$corpo_email .= "Costura Algodao" . " : " . $_POST['options_costura_algodao'];
			$corpo_email .= "\r\n\r\n";
		}

		// IMPRESSAO
		if (isset($_POST['options_impressao_algodao']) == 1) {
			$corpo_email .= "Impressao Algodao" . " : " . $_POST['options_impressao_algodao'];
			$corpo_email .= "\r\n\r\n";
		}

		// GOLA
		if (isset($_POST['options_gola_algodao']) == 1) {
			$corpo_email .= "Tipo de Gola Algodao" . " : " . $_POST['options_gola_algodao'];
			$corpo_email .= "\r\n\r\n";
		}

	}

	if (isset($_POST['options_malha_piquet']) == 1) {
		$corpo_email .= "-- Piquet - Tamanho e Quantidade: ";
		$corpo_email .= "\r\n\r\n";

		if (isset($_POST['opt_piquet_p']) == 1) {
			$corpo_email .= $_POST['opt_piquet_p'] . " : " . $_POST['opt_piquet_p_length'];
			$corpo_email .= "\r\n\r\n";
		}

		if (isset($_POST['opt_piquet_m']) == 1) {
			$corpo_email .= $_POST['opt_piquet_m'] . " : " . $_POST['opt_piquet_m_length'];
			$corpo_email .= "\r\n\r\n";
		}

		if (isset($_POST['opt_piquet_g1']) == 1) {
			$corpo_email .= $_POST['opt_piquet_g1'] . " : " . $_POST['opt_piquet_g1_length'];
			$corpo_email .= "\r\n\r\n";
		}

		if (isset($_POST['opt_piquet_g2']) == 1) {
			$corpo_email .= $_POST['opt_piquet_g2'] . " : " . $_POST['opt_piquet_g2_length'];
			$corpo_email .= "\r\n\r\n";
		}

		// COSTURA
		if (isset($_POST['options_costura_piquet']) == 1) {
			$corpo_email .= "Costura Piquet" . " : " . $_POST['options_costura_piquet'];
			$corpo_email .= "\r\n\r\n";
		}

		// IMPRESSAO
		if (isset($_POST['options_impressao_piquet']) == 1) {
			$corpo_email .= "Impressao Piquet" . " : " . $_POST['options_impressao_piquet'];
			$corpo_email .= "\r\n\r\n";
		}

		// GOLA
		if (isset($_POST['options_gola_piquet']) == 1) {
			$corpo_email .= "Tipo de Gola Piquet" . " : " . $_POST['options_gola_piquet'];
			$corpo_email .= "\r\n\r\n";
		}

	}

	if (isset($_POST['options_malha_micro']) == 1) {
		$corpo_email .= "-- Micro Romantic - Tamanho e Quantidade: ";
		$corpo_email .= "\r\n\r\n";

		if (isset($_POST['opt_micro_p']) == 1) {
			$corpo_email .= $_POST['opt_micro_p'] . " : " . $_POST['opt_micro_p_length'];
			$corpo_email .= "\r\n\r\n";
		}

		if (isset($_POST['opt_micro_m']) == 1) {
			$corpo_email .= $_POST['opt_micro_m'] . " : " . $_POST['opt_micro_m_length'];
			$corpo_email .= "\r\n\r\n";
		}

		if (isset($_POST['opt_micro_g1']) == 1) {
			$corpo_email .= $_POST['opt_micro_g1'] . " : " . $_POST['opt_micro_g1_length'];
			$corpo_email .= "\r\n\r\n";
		}

		if (isset($_POST['opt_micro_g2']) == 1) {
			$corpo_email .= $_POST['opt_micro_g2'] . " : " . $_POST['opt_micro_g2_length'];
			$corpo_email .= "\r\n\r\n";
		}

		// COSTURA
		if (isset($_POST['options_costura_micro']) == 1) {
			$corpo_email .= "Costura MicroRomantic" . " : " . $_POST['options_costura_micro'];
			$corpo_email .= "\r\n\r\n";
		}

		// IMPRESSAO
		if (isset($_POST['options_impressao_micro']) == 1) {
			$corpo_email .= "Impressao MicroRomantic" . " : " . $_POST['options_impressao_micro'];
			$corpo_email .= "\r\n\r\n";
		}

		// GOLA
		if (isset($_POST['options_gola_micro']) == 1) {
			$corpo_email .= "Tipo de Gola MicroRomantic" . " : " . $_POST['options_gola_micro'];
			$corpo_email .= "\r\n\r\n";
		}



	}
}




// BONE
if (isset($_POST['options_produto_bone']) == 1) {
	$corpo_email .= "- Bone";
	$corpo_email .= "\r\n\r\n";
}

// CHINELO
if (isset($_POST['options_produto_chinelo']) == 1) {
	$corpo_email .= "- Chinelo";
	$corpo_email .= "\r\n\r\n";
}

// MOUSEPAD
if (isset($_POST['options_produto_mouse']) == 1) {
	$corpo_email .= "- Mousepad";
	$corpo_email .= "\r\n\r\n";
}

// ECOBAG
if (isset($_POST['options_produto_ecobag']) == 1) {
	$corpo_email .= "- Ecobag";
	$corpo_email .= "\r\n\r\n";
}

// AVENTAL
if (isset($_POST['options_produto_avental']) == 1) {
	$corpo_email .= "- Avental";
	$corpo_email .= "\r\n\r\n";
}

// CAMISA SOCIAL
if (isset($_POST['options_produto_camisa_social']) == 1) {
	$corpo_email .= "- Camisa Social";
	$corpo_email .= "\r\n\r\n";
}

// CALCA SOCIAL
if (isset($_POST['options_produto_calca_social']) == 1) {
	$corpo_email .= "- Calca Social";
	$corpo_email .= "\r\n\r\n";
}

// CALCA BRIM
if (isset($_POST['options_produto_calca_brim']) == 1) {
	$corpo_email .= "- Calca Brim";
	$corpo_email .= "\r\n\r\n";
}

// BERMUDA BRIM
if (isset($_POST['options_produto_bermuda_brim']) == 1) {
	$corpo_email .= "- Bermuda Brim";
	$corpo_email .= "\r\n\r\n";
}

// JALECO BRIM
if (isset($_POST['options_produto_jaleco_brim']) == 1) {
	$corpo_email .= "- Jaleco Brim";
	$corpo_email .= "\r\n\r\n";
}


//create an instance of PHPMailer
$mail = new PHPMailer();

$mail->IsSMTP();// telling the class to use SMTP
$mail->SMTPAuth   = true;
$mailer->Port = 587; //Indica a porta de conexão para a saída de e-mails
$mailer->Host = 'mail.gabrielvalle.com.br'; //Endereço do Host do SMTP Locaweb
$mailer->SMTPAuth = true; //define se haverá ou não autenticação no SMTP
$mail->Username = 'contato@gabrielvalle.com.br';
$mail->Password = 'biL20206510rc';
$mail->From = 'contato@gabrielvalle.com.br';
$mail->FromName = $_POST['inputName'];
$mail->AddAddress('contato@gabrielvalle.com.br'); //recipient 
$mail->Subject = 'Mensagem do site';
$mail->Body = $corpo_email;

if (isset($_POST['ref'])) {
    $mail->Body .= "\r\n\r\nRef: " . $_POST['ref'];
}

if(!$mail->send()) {
    $data = array('success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
    echo json_encode($data);
    exit;
}

$data = array('success' => true, 'message' => 'Thanks! We have received your message.');
echo json_encode($data);
