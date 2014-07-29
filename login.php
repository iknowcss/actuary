<?php include('resource/new-header.php'); ?>

<script type="text/javascript" src="ui/js/view-model/login-form.js"></script>
<script type="text/javascript" src="ui/js/page/login-page.js"></script>

<header id="logged-out">
  <h1>JIRA Estimation App</h1>
</header>

<main id="login-page">

  <section>
    <form id="login-form" action="card-list.php" method="GET">
      <fieldset>
        <div class="container">
          <label for="user">User name</label>
        </div>
        <div class="container">
          <input id="user" type="text" name="user" data-bind="value: user, valueUpdate: 'afterkeydown'"/>
        </div>
      </fieldset>
      <fieldset class="action container">
        <button data-bind="enable: isValidUser">Log-in</button>
      </fieldset>
    </form>
  </section>

</main>


<?php include('resource/footer.php'); ?>