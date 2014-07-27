<?php

  require_once "init-db.php";

  function getUserCardById($id) {
    return getDb()->userCards->findOne(array('_id' => new MongoId($id)));
  }

  function getUserCardsForUser($user) {
    $userCards = array();
    $userCardsCollection = getDb()->userCards;
    $cursor = $userCardsCollection->find(array(
      'userId' => $user['_id']
    ));

    while ($cursor->hasNext()) {
      $cursor->next();
      array_push($userCards, $cursor->current());
    }

    return $userCards;
  }

  function getUserCardByCardNumber($user, $cardNumber, $failOnNoCard=false) {
    $userCard = getDb()->userCards->findOne(array(
      'userId'     => $user['_id'],
      'cardNumber' => $cardNumber
    ));

    if (!$userCard) {
      if ($failOnNoCard) {
        error_log("Could not create a new user card!");
        exit();
      }
      createUserCardWithCardNumber($user, $cardNumber);
      return getUserCardByCardNumber($user, $cardNumber, true);
    }

    return $userCard;
  }

  function createUserCardWithCardNumber($user, $cardNumber) {
    getDb()->userCards->insert(array(
      'userId' => $user['_id'],
      'cardNumber' => $cardNumber
    ));
  }

  function updateUserCardGroups($id, $groups) {
    getDb()->userCards->update(
      array( '_id'    => new MongoId($id) ),
      array( '$set' => array( 'groups' => $groups ) )
    );
  }

?>