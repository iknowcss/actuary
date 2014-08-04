<?php

  require_once "init-db.php";

  function ensureUserCardVersion($testUserCard) {
    $latestUserCardVersionNumber = 1;
    if ($testUserCard) {
      if (!isset($testUserCard['versionNumber']) || $testUserCard['versionNumber'] != $latestUserCardVersionNumber) {
        $errorMessage = "The userCard data is out of date with version number "
                        .$testUserCard['versionNumber']
                        .". Expected $latestUserCardVersionNumber"
                        .". Try running a migration";
        echo $errorMessage;
        throw new Exception($errorMessage);
      }
    }
    return $testUserCard;
  }

  function getUserCardById($id) {
    ensureUserCardVersion(getDb()->userCards
      ->findOne(array('_id' => new MongoId($id))));
  }

  function getUserCardsForUser($user) {
    $userCards = array();
    $userCardsCollection = getDb()->userCards;
    $cursor = $userCardsCollection->find(array(
      'userId' => $user['_id']
    ));

    while ($cursor->hasNext()) {
      $cursor->next();
      array_push($userCards, ensureUserCardVersion($cursor->current()));
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

    return ensureUserCardVersion($userCard);
  }

  function createUserCardWithCardNumber($user, $cardNumber) {
    getDb()->userCards
        ->insert(array(
          'userId'        => $user['_id'],
          'cardNumber'    => $cardNumber,
          'versionNumber' => $latestUserCardVersion
        ));
  }

  function updateUserCardGroups($id, $groups) {
    getDb()->userCards->update(
      array('_id'  => new MongoId($id)),
      array('$set' => array( 'groups' => $groups ))
    );
  }

?>