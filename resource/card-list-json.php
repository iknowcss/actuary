<script id="existing-card-numbers" type="application/json"><?
  $userCards = getUserCardsForUser($user);
  $cardNumbers = array();
  foreach ($userCards as $userCard) {
    array_push($cardNumbers, $userCard['cardNumber']);
  }
  sort($cardNumbers);
  echo json_encode($cardNumbers);
?></script>