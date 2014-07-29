<?
  include('resource/new-header.php');
  require_once "data-access/user-card.php";
?>

<script type="text/javascript" src="ui/js/view-model/card-list-create-form.js"></script>

<script id="existing-card-numbers" type="application/json"><?
  $userCards = getUserCardsForUser($user);
  $cardNumbers = array();
  foreach ($userCards as $userCard) {
    array_push($cardNumbers, $userCard['cardNumber']);
  }
  sort($cardNumbers);
  echo json_encode($cardNumbers);
?></script>
<script type="text/javascript" src="ui/js/page/card-list-page.js"></script>

<header id="logged-in">
  <nav class="left">
    <ul>
      <li><a href="./card-list.php?user=<? echo $userName; ?>">Cards</a></li>
    </ul>
  </nav>
  <? include('resource/user-header.php'); ?>
</header>

<main id="card-list-page">
  <header class="container">
    <h1>Actuary</h1>
  </header>
  <section class="container">
    <form id="card-list-create-form" action="estimation-form.php" method="GET">
      <fieldset>
        <div class="container">
          <label for="card-number">Card number</label>
        </div>
        <div>
          <input id="card-number" type="text" name="cardNumber" autocomplete="off"
              data-bind="value: cardNumber,
                         valueUpdate: 'afterkeydown',
                         autocomplete: existingCardNumbers"/>
        </div>
        <div class="action">
          <button data-bind="enable: isValidCardNumber">Estimate</button>
          <a href="#" data-bind="click: resetCardNumber">Clear</a>
        </div>
      </fieldset>
      <input type="hidden" name="user" value="<? echo $userName ?>"/>
    </form>
  </section>
</main>

<?php include('resource/footer.php'); ?>