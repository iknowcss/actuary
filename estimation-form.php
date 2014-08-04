<?
  include('resource/header.php');
  require_once "data-access/user-card.php";
?>

<?
  $cardNumber = $_GET['cardNumber'];
  if (!preg_match('/^[A-Z]+-\d+$/', $cardNumber)) {
    header('Location: ./login.php');
    exit();
  }
?>

<? include('resource/card-list-json.php'); ?>
<script id="user-card-data" type="application/json"><? echo json_encode(getUserCardByCardNumber($user, $cardNumber)); ?></script>
<script type="text/javascript" src="ui/js/view-model/estimation-form.js"></script>
<script type="text/javascript" src="ui/js/page/estimation-form-page.js"></script>

<header id="logged-in">
  <nav class="container">
    <a class="logo" href="./card-list.php?user=<? echo $userName; ?>">Actuary</a>
    <form id="jump-form" method="GET"
        data-bind="submit: function () { return isValidCardNumber(); }">
      <input type="hidden" name="user" value="<? echo $userName; ?>"/>
      <input type="text" name="cardNumber" class="jump-input" autocomplete="off" value="<? echo $cardNumber; ?>" 
          data-bind="value: cardNumber,
                     valueUpdate: 'afterkeydown',
                     autocomplete: existingCardNumbers"/>
      <button class="jump-button"
          data-bind="enable: isValidCardNumber">Go</button>
    </form>
    <? include('resource/user-header.php'); ?>
  </nav>
</header>

<main id="estimation-form-page">
  <header class="container global-estimate-total-row">
    <h1>
      <? echo $cardNumber; ?>
      <span class="jira-link">(
        <a href="https://jira.ec2.local/browse/<? echo $cardNumber; ?>" target="_blank">JIRA</a>
      )</span>
    </h1>

    <span class="estimate-title">Estimate</span>
    <span class="estimate-total" data-bind="text: grandTotal.initPokerPoints() ? grandTotal.initPokerPoints() : '-'"></span>
    <span class="estimate-raw-total" data-bind="text: grandTotal.initPoints().toFixed(2)"></span>
    <br/>
    <span class="estimate-title">Actual effort</span>
    <span class="estimate-total" data-bind="text: grandTotal.postPokerPoints() ? grandTotal.postPokerPoints() : '-'"></span>
    <span class="estimate-raw-total" data-bind="text: grandTotal.postPoints().toFixed(2)"></span>
  </header>

  <form id="estimation-form">

    <!-- ko foreach: groups -->
    <section>
      <header class="container group-name">
        <h2 data-bind="text: name"></h2>
      </header>

      <header class="container">
        <h3 class="estimate-type-header" data-bind="visible: $parent.tab() == 'ESTIMATE'">Estimated difficulty</h3>
        <h3 class="estimate-type-header" data-bind="visible: $parent.tab() == 'ACTUAL'">Actual difficulty</h3>
        <h3 class="estimate-note-header">Notes</h3>
      </header>

      <div class="estimate-item-row-container" data-bind="foreach: items">

        <div class="container estimate-item-row">
          <div data-bind="visible: $parents[1].tab() == 'ESTIMATE'">
            <div class="estimate-title" data-bind="text: name"></div>
            <div class="estimate-effort" data-bind="effortRating: initRating"></div>
            <div class="estimate-score" data-bind="text: initPoints() ? initPoints().toFixed(2) : ''"></div>
          </div>
          <div data-bind="visible: $parents[1].tab() == 'ACTUAL'">
            <div class="estimate-title" data-bind="text: name"></div>
            <div class="estimate-effort" data-bind="effortRating: postRating"></div>
            <div class="estimate-score" data-bind="text: postPoints() ? postPoints().toFixed(2) : ''"></div>
          </div>
          <div class="estimate-note" data-bind="effortNote: note"></div>
        </div>
      </div>

      <div class="container estimate-total-row">
        <div data-bind="visible: $parent.tab() == 'ESTIMATE'">
          <div class="estimate-title"><b>Partial points:</b></div>
          <div class="estimate-score" data-bind="text: total.initPoints().toFixed(2)"></div>
        </div>
        <div data-bind="visible: $parent.tab() == 'ACTUAL'">
          <div class="estimate-title"><b>Partial points:</b></div>
          <div class="estimate-score" data-bind="text: total.postPoints().toFixed(2)"></div>
        </div>
        <div class="estimate-note"></div>
      </div>
    </section>
    <!-- /ko -->

  </form>

</main>

<?php include('resource/footer.php'); ?>