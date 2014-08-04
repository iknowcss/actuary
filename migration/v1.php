<?php

  require_once "../data-access/migration.php";

  header('Content-Type: text/plain');

  $versionNumber = 1;

  $migration = getMigrationByVersionNumber($versionNumber);

  // Ensure it is only run once
  if ($migration) {
    echo "Already applied on "
         .date('r', time($migration['lastModified']))
         ." with final state: "
         .$migration['state']."\n";
    exit();
  } else {
    echo "Apply migration\n";
  }

  $userCardsCollection = getDb()->userCards;
  $userCardCursor = $userCardsCollection->find();

  updateMigrationByVersionNumber($versionNumber, 'started');

  // For every user card in the database
  while ($userCardCursor->hasNext()) {
    // Load the user card groups into a hash array A
    $userCardCursor->next();
    $userCard = $userCardCursor->current();
    $oldGroups = $userCard['groups'];

    echo "\n";

    if (!$oldGroups) {
      echo "Skip card (no groups): ".$userCard['cardNumber']."\n";
      $userCardsCollection->update(
        array('_id' => $userCard['_id']),
        array('$set' => array('versionNumber' => $versionNumber))
      );
      continue;
    }
    
    echo "Update groups for card: ".$userCard['cardNumber']."\n";

    // Create a new hash array B
    $newGroups = array();

    // Loop through each group in A
    $ordinal = 64;
    foreach ($userCard['groups'] as $oldGroup) {
      $groupName = $oldGroup['name'];
      echo "Migrate group: ".$groupName."\n";

      $groupId = strtolower($groupName);
      $groupId = preg_replace('/[^a-z0-9]/', '-', $groupId);
      echo "New group id: ".$groupId."\n";

      // Create a new corresponding group in B
      $newGroup = array(
        "name"    => $groupName,
        "ordinal" => $ordinal,
        "items"   => array()
      );
      echo "New group base: ".json_encode($newGroup)."\n";
      $ordinal += 64;

      // Loop through each item in group A
      foreach ($oldGroup['items'] as $oldItem) {
        $itemName = $oldItem['name'];
        echo "Migrate item: ".$itemName."\n";

        $itemId = strtolower($itemName);
        $itemId = preg_replace('/[^a-z0-9]/', '-', $itemId);
        echo "New item id: ".$itemId."\n";

        // Create a new corresponding item in group B
        $newItem = array(
          "name"        => $itemName,
          "initRating"  => $oldItem['initRating'],
          "postRating"  => $oldItem['postRating'],
          "weight"      => 25
        );
        $newGroup['items'][$itemId] = $newItem;
      }

      // Add the new group
      $newGroups[$groupId] = $newGroup;
    }

    echo "\nNew 'groups' Full JSON:\n".json_encode($newGroups)."\n";
 
    // Save to the database
    $userCardsCollection->update(
      array('_id' => $userCard['_id']),
      array('$set' => array(
        'groups'        => $newGroups,
        'versionNumber' => $versionNumber
      ))
    );
  }

  updateMigrationByVersionNumber($versionNumber, 'success');

?>