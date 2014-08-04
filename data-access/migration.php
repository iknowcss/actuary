<?php

  require_once 'init-db.php';
  
  function getMigrationByVersionNumber($versionNumber) {
    return getDb()->migrations
        ->findOne(array('versionNumber' => $versionNumber));
  }

  function updateMigrationByVersionNumber($versionNumber, $newState) {
    getDb()->migrations
        ->update(
            array('versionNumber' => $versionNumber),
            array(
              '$set' => array(
                'versionNumber' => $versionNumber,
                'state'         => $newState
              ),
              '$currentDate'  => array(
                'lastModified'  => array('$type' => 'timestamp')
              )
            ),
            array('upsert' => true)
          );
  }

?>