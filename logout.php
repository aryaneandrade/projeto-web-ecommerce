<?php
session_start();

// Remove dados do usuário
unset($_SESSION['user_id']);
unset($_SESSION['user_nome']);

// Redireciona para a Home
header("Location: index.php");
exit;