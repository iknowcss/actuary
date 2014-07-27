<?php

  require_once "init-db.php";

  function getUserByUserName($userName, $failOnNoUser=false) {
    $userCollection = getDb()->users;
    $userCursor = $userCollection->find(array('userName' => $userName));

    if ($userCursor->count() == 0) {
      if ($failOnNoUser) {
        error_log("Could not create a new user!");
        exit();
      }
      createUserWithUserName($userName);
      return getUserByUserName($userName, true);
    }

    $userCursor->next();
    return $userCursor->current();
  }

  function createUserWithUserName($userName) {
    getDb()->users->insert(array(
      'userName' => $userName
    ));
  }

?>