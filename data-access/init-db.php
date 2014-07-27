<?php

  function getDb() {
    $mongoClient = new MongoClient();
    $db = $mongoClient->actuary;
    return $db;
  }

?>