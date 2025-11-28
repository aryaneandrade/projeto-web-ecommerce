<?php 

// Credenciais de acesso ao Banco de Dados
$db_host= "localhost";
$db_name= "black_friday";
$db_user= "root";
$db_pass= "";


try{
    // Conexão via PDO (PHP Data Objects)
    // O PDO é essencial pois previne nativamente ataques de SQL Injection
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);

    // Ativa o modo de erros para Exceptions
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

}catch(PDOException $e){   

    // Tratamento de erro: Se o banco cair, o usuário recebe uma mensagem
    $error = $e->getMessage();
    echo "Erro: ". $error;
}

?>
