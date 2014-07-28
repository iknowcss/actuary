<?php include('resource/new-header.php'); ?>

<script type="text/javascript" src="ui/js/view-model/login-form.js"></script>
<script type="text/javascript" src="ui/js/page/login-page.js"></script>

<section>
  <h1>JIRA Estimation App</h1>
</section>

<div id="login-page">

  <section>
    <form id="login-form" action="card-list.php" method="GET">
      <fieldset>
        <label for="user">User name</label>
        <input id="user" type="text" name="user" data-bind="value: user, valueUpdate: 'afterkeydown'"/>
      </fieldset>
      <fieldset class="action">
        <button data-bind="enable: isValidUser">Log-in</button>
      </fieldset>
    </form>
  </section>

</div>


<?php include('resource/footer.php'); ?>