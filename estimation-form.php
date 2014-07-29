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

  $userCard = getUserCardByCardNumber($user, $cardNumber);
?>

<script id="user-card-data" type="application/json"><? echo json_encode($userCard); ?></script>
<script type="text/javascript" src="ui/js/view-model/estimation-form.js"></script>
<script type="text/javascript" src="ui/js/page/estimation-form-page.js"></script>

<header id="logged-in" class="container">
  <nav class="left">
    <ul>
      <li><a href="./card-list.php?user=<? echo $userName; ?>">Actuary</a></li>
      <li><a href="./estimation-form.php?cardNumber=<? echo $cardNumber; ?>&amp;user=<? echo $userName; ?>"><? echo $cardNumber; ?></a></li>
    </ul>
  </nav>
  <? include('resource/user-header.php'); ?>
</header>

<main id="estimation-form-page">
  <header class="container">
    <h1><? echo $cardNumber; ?></h1>
  </header>

  <section class="container global-estimate-total-row">
    <span class="estimate-title">Estimate</span>
    <span class="estimate-total" data-bind="text: storyPoints.initPoints"></span>
  </section>

  <section class="container global-estimate-total-row">
    <span class="estimate-title">Actual effort</span>
    <span class="estimate-total" data-bind="text: storyPoints.postPoints"></span>
  </section>

  <form id="estimation-form">

    <!-- ko foreach: groups -->
    <section>
      <header class="container">
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
          </div>
          <div data-bind="visible: $parents[1].tab() == 'ACTUAL'">
            <div class="estimate-title" data-bind="text: name"></div>
            <div class="estimate-effort" data-bind="effortRating: postRating"></div>
          </div>
          <div class="estimate-note" data-bind="effortNote: note"></div>
        </div>
      </div>

      <div class="container estimate-total-row">
        <div data-bind="visible: $parent.tab() == 'ESTIMATE'">
          <div class="estimate-title"><b>Partial points:</b></div>
          <div class="estimate-effort" data-bind="text: points.initRawPoints"></div>
        </div>
        <div data-bind="visible: $parent.tab() == 'ACTUAL'">
          <div class="estimate-title"><b>Partial points:</b></div>
          <div class="estimate-effort" data-bind="text: points.postRawPoints"></div>
        </div>
        <div class="estimate-note"></div>
      </div>
    </section>
    <!-- /ko -->

  </form>

</main>

<?php include('resource/footer.php'); ?>