<?
  include('resource/new-header.php');
  require_once "data-access/user-card.php";
?>

<script type="text/javascript" src="ui/js/view-model/card-list-create-form.js"></script>
<script type="text/javascript" src="ui/js/page/card-list-page.js"></script>

<header id="logged-in">
  <nav class="left">
    <ul>
      <li><a href="./card-list.php?user=<? echo $userName; ?>">Cards</a></li>
    </ul>
  </nav>
  <? include('resource/user-header.php'); ?>
</header>

<div id="card-list-page">
  <section>
    <h1>New estimation</h1>

    <form id="card-list-create-form" action="estimation-form.php" method="GET">
      <input type="hidden" name="user" value="<? echo $userName ?>"/>
      <fieldset>
        <label>Card number</label>
        <input type="text" name="cardNumber" autocomplete="off"
            data-bind="value: cardNumber, valueUpdate: 'afterkeydown'"/>
      </fieldset>
      <fieldset class="action">
        <button class="split" data-bind="enable: isValidCardNumber">Create</button>
        <a class="split" href="#" data-bind="click: resetCardNumber">Clear</a>
      </fieldset>
    </form>

  </section>

  <?
  $userCards = getUserCardsForUser($user);
  if (sizeof($userCards) > 0) {?>

  <section id="previous-cards">
    <h1>Previous cards</h1>
    <ul>
      <? foreach ($userCards as $userCard) { ?>
      <li><a href="./estimation-form.php?user=<? echo $userName; ?>&amp;cardNumber=<? echo $userCard['cardNumber']; ?>">
        <? echo $userCard['cardNumber']; ?>
      </a></li>
      <? } ?>
    </ul>
  </section>
  <?}?>

</div>

<?php include('resource/footer.php'); ?>