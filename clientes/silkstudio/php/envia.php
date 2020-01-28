<?php  


		
		$nome     = utf8_decode (strip_tags(trim($_POST['nome'])));
		$email    = utf8_decode (strip_tags(trim($_POST['email'])));
		$phone 	  = utf8_decode (strip_tags(trim($_POST['phone'])));
		$cel 	  = utf8_decode (strip_tags(trim($_POST['cel'])));
		$mensagem = utf8_decode (strip_tags(trim($_POST['mensagem'])));
			
			require_once('PHPMailer/class.phpmailer.php');
			
			$Email = new PHPMailer();
			$Email->SetLanguage("br");
			$Email->IsSMTP(); // Habilita o SMTP 
			$Email->SMTPAuth = true; //Ativa e-mail autenticado
			$Email->Host = 'mail.gabrielvalle.com.br'; // Servidor de envio # verificar qual o host correto com a hospedagem as vezes fica como smtp.
			$Email->Port = '587'; // Porta de envio
			$Email->Username = 'contato@gabrielvalle.com.br'; //e-mail que será autenticado
			$Email->Password = 'biL20206510rc'; // senha do email
			// ativa o envio de e-mails em HTML, se false, desativa.
			$Email->IsHTML(true); 
			// email do remetente da mensagem
			$Email->From = 'contato@gabrielvalle.com.br';
			// nome do remetente do email
			$Email->FromName = utf8_decode($email);
			// Endereço de destino do emaail, ou seja, pra onde você quer que a mensagem do formulário vá?
			$Email->AddReplyTo($email, $nome);
			$Email->AddAddress("contato@gabrielvalle.com.br"); // para quem será enviada a mensagem
			// informando no email, o assunto da mensagem
			$Email->Subject = "(Contato do site - seudominio.com.br)";
			// Define o texto da mensagem (aceita HTML)
			$Email->Body .= "<br /><br />
							 <strong>Nome:</strong> $nome<br /><br />
							 <strong>E-mail:</strong> $email<br /><br />
							 <strong>Telefone:</strong> $phone <br /><br />
							 <strong>Celular:</strong> $cel <br /><br />
							 <strong>Mensagem:</strong><br /> $mensagem";	
			// verifica se está tudo ok com oa parametros acima, se nao, avisa do erro. Se sim, envia.
			if(!$Email->Send()){
				echo "<p>A mensagem não foi enviada. </p>";
				echo "Erro: " . $Email->ErrorInfo;
			}else{
				echo "<script>location.href='sucesso.html'</script>";
		
			}
			
?>
