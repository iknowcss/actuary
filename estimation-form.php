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

<div class="container_12">
  <div class="grid_6 header">
    <a href="./card-list.php?user=<? echo $userName; ?>">Cards</a> &gt;
    <span><? echo $cardNumber; ?></span>
  </div>
  <?php include('resource/user-header.php'); ?>
</div>

<form id="estimation-form">

  <div id="estimation-form-title">
    <div class="container_12">
      <h1 class="grid_6">
        <a href="https://jira.ec2.local/browse/<? echo $cardNumber; ?>"
            target="_blank">
          <? echo $cardNumber; ?>
        </a>
      </h1>
    </div>
    <div class="container_12">
      <div class="grid_6 estimation-totals">
        <div class="clear"></div>
        <div class="grid_4 alpha bold">Initial estimation</div>
        <div class="grid_1 align-right" data-bind="text: storyPoints.initPoints"></div>
        <div class="clear"></div>
        <div class="grid_4 alpha bold">Post-implementation</div>
        <div class="grid_1 align-right" data-bind="text: storyPoints.postPoints"></div>
      </div>
    </div>
  </div>

  <!-- ko foreach: groups -->
  <div class="container_12">
    <h2 class="grid_12" data-bind="text: name"></h2>
  </div>
  <div class="container_12">
    <h3 class="grid_5" data-bind="visible: $parent.tab() == 'ESTIMATE'">Estimated difficulty</h3>
    <h3 class="grid_5" data-bind="visible: $parent.tab() == 'ACTUAL'">Actual difficulty</h3>
    <h3 class="grid_4">Notes</h3>
  </div>
  <div class="item-row-container" data-bind="foreach: items">

    <div class="container_12 item-row" >
      <div data-bind="visible: $parents[1].tab() == 'ESTIMATE'">
        <div class="grid_3" data-bind="text: name"></div>
        <div class="grid_2" data-bind="effortRating: initRating"></div>
      </div>
      <div data-bind="visible: $parents[1].tab() == 'ACTUAL'">
        <div class="grid_3" data-bind="text: name"></div>
        <div class="grid_2" data-bind="effortRating: postRating"></div>
      </div>
      <div class="grid_7" data-bind="effortNote: note"></div>
    </div>

  </div>

  <div class="container_12 total-row">
    <div data-bind="visible: $parent.tab() == 'ESTIMATE'">
      <div class="grid_3"><b>Partial points:</b></div>
      <div class="grid_2 align-right" data-bind="text: points.initRawPoints"></div>
    </div>
    <div data-bind="visible: $parent.tab() == 'ACTUAL'">
      <div class="grid_3"><b>Partial points:</b></div>
      <div class="grid_2 align-right" data-bind="text: points.postRawPoints"></div>
    </div>
    <div class="grid_7"></div>
  </div>
  <!-- /ko -->

</form>

<?php include('resource/footer.php'); ?>