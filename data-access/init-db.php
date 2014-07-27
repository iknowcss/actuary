<?php

  function getDb() {
    $dbUser = getenv('MONGO_DB_USER');
    $dbPass = getenv('MONGO_DB_PASS');
    $dbHost = getenv('MONGO_DB_HOST');
    $dbPort = getenv('MONGO_DB_PORT');
    $dbName = getenv('MONGO_DB_NAME');

    if (!$dbHost) {
      $dbHost = 'localhost';
    }

    if ($dbUser && $dbPass) {
      $dbCredentials = "$dbUser:$dbPass@";
    } else {
      $dbCredentials = '';
    }

    if ($dbPort) {
      $dbPort = ":$dbPort";
    }

    if (!$dbName) {
      $dbName = 'actuary';
    }

    $dbConnectionString = "mongodb://${dbCredentials}${dbHost}${dbPort}";
    $m = new MongoClient($dbConnectionString, array("db" => $dbName));

    return $m->$dbName;
  }

?>