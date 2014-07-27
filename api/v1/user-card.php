<?php

require_once "../../data-access/user-card.php";

// Ensure request is a PUST
$method = $_SERVER['REQUEST_METHOD'];
if ($method != 'PUT') {
  header('HTTP/1.0 405 Method Not Allowed');
  exit();
}

// Load PUT request and ensure it is valid
$putData = json_decode(file_get_contents("php://input"), true);
if (!$putData) {
  header('HTTP/1.0 400 Bad Request');
  exit();
}

// Load UserCard object from database and make sure it exists
$userCard = getUserCardById($putData['userCardId']);
if (!$userCard) {
  header('HTTP/1.0 404 Not Found');
  exit();
}

// Add the groups data to the UserCard.
// TODO: JSON validation
updateUserCardGroups($putData['userCardId'], $putData['groups']);

// Success: No Content
header('HTTP/1.0 204 No Content');

?>