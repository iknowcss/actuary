<?php include('resource/header.php'); ?>

<script type="text/javascript" src="ui/js/view-model/login-form.js"></script>
<script type="text/javascript" src="ui/js/page/login-page.js"></script>

<div class="container_12">
  <h1 class="grid_12">JIRA Estimation App</h1>
</div>

<form id="login-form" class="basic-form" action="card-list.php" method="GET">
  <div class="container_12">
    <h2 class="prefix_4 grid_6">User name</h2>
  </div>
  <div class="container_12">
    <div class="prefix_4 grid_4">
      <input type="text" name="user" data-bind="value: user, valueUpdate: 'afterkeydown'"/>
    </div>
  </div>
  <div class="container_12 action">
    <div class="prefix_4 grid_4">
      <button data-bind="enable: isValidUser">Log-in</button>
    </div>
  </div>
</form>

<?php include('resource/footer.php'); ?>