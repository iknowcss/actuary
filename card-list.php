<?
  include('resource/header.php');
  require_once "data-access/user-card.php";
?>

<script type="text/javascript" src="ui/js/view-model/card-list-create-form.js"></script>
<script type="text/javascript" src="ui/js/page/card-list-page.js"></script>

<div class="container_12">
  <div class="grid_6 header">
    <span>Cards</a>
  </div>
  <? include('resource/user-header.php'); ?>
</div>

<div class="container_12">
  <h1 class="grid_12">New estimation</h1>
</div>

<form id="card-list-create-form" class="basic-form" action="estimation-form.php" method="GET">
  <input type="hidden" name="user" value="<? echo $userName ?>"/>
  <div class="container_12">
    <div class="grid_3">
      <input type="text" name="cardNumber" autocomplete="off"
          data-bind="value: cardNumber, valueUpdate: 'afterkeydown'"/>
    </div>
  </div>
  <div class="container_12 action">
    <div class="grid_1">
      <button data-bind="enable: isValidCardNumber">Create</button>
    </div>
    <div class="grid_1">
      <a href="#" data-bind="click: resetCardNumber">Clear</a>
    </div>
  </div>
</form>

<?
$userCards = getUserCardsForUser($user);
if (sizeof($userCards) > 0) {?>

<div class="container_12">
  <h1 class="grid_12">Previous cards</h1>
</div>

<div class="container_12">
  <ul class="grid_6">
    <? foreach ($userCards as $userCard) { ?>
    <li><a href="./estimation-form.php?user=<? echo $userName; ?>&amp;cardNumber=<? echo $userCard['cardNumber']; ?>">
      <? echo $userCard['cardNumber']; ?>
    </a></li>
    <? } ?>
  </ul>
</div>

<?}?>


<?php include('resource/footer.php'); ?>