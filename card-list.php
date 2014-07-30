<?
  include('resource/header.php');
  require_once "data-access/user-card.php";
?>

<? include('resource/card-list-json.php'); ?>
<script type="text/javascript" src="ui/js/view-model/card-list-create-form.js"></script>
<script type="text/javascript" src="ui/js/page/card-list-page.js"></script>

<header id="logged-in">
  <nav class="container">
    <a class="logo" href="./card-list.php?user=<? echo $userName; ?>">Actuary</a>
    <span type="text" class="jump-input"></span>
    <span class="jump-button"></span>
    <? include('resource/user-header.php'); ?>
  </nav>
</header>

<main id="card-list-page">
  <header class="container">
    <h1>What card will you estimate?</h1>
  </header>
  <section>
    <form id="card-list-create-form" action="estimation-form.php" method="GET">
      <fieldset>
        <div class="container">
          <label for="card-number">Card number</label>
        </div>
        <div class="container">
          <input id="card-number" type="text" name="cardNumber" autocomplete="off"
              data-bind="value: cardNumber,
                         valueUpdate: 'afterkeydown',
                         autocomplete: existingCardNumbers"/>
          <div class="action">
            <button data-bind="enable: isValidCardNumber">Estimate</button>
            <a href="#" data-bind="click: resetCardNumber">Clear</a>
          </div>
        </div>
      </fieldset>
      <input type="hidden" name="user" value="<? echo $userName ?>"/>
    </form>
  </section>
  <section class="container">
    <asside id="tip">
      Type 
      <span class="keyboard">Ctrl</span> + 
      <span class="keyboard">J</span>
      to jump<br/>to the card number input
    </asside>
  </section>
</main>

<?php include('resource/footer.php'); ?>