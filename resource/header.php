<?
  require_once "data-access/user.php";

  // Get the user name from the query string
  $rawUserName = array_key_exists('user', $_GET) ? $_GET['user'] : '';

  // Clean it and make it lowercase
  $userName = strtolower(preg_replace("/[^a-zA-Z0-9_\-]/", '', $rawUserName));

  // If a user name is not specified and this is not the login page, redirec
  // to the login page
  if (strlen($userName) == 0 && basename($_SERVER['PHP_SELF']) != 'login.php') {
    header('Location: ./login.php');
    exit();
  }

  // Get a reference to the user object
  $user = getUserByUserName($userName);
?>

<!doctype html>
<html lang="en">
<head>
  <link type="text/css" href="ui/font/open-sans/font.css" rel="stylesheet"/>
  <link type="text/css" href="ui/font/fontello/css/fontello.css" rel="stylesheet"/>
  <link type="text/css" href="ui/font/aspire/font.css" rel="stylesheet"/>
  <link type="text/css" href="ui/generated-css/styles.css" rel="stylesheet"/>
  
  <script type="text/javascript" src="ui/js/vendor/Tocca.min.js"></script>
  <script type="text/javascript">var JUST_ON_TOUCH_DEVICES = true;</script>

  <script type="text/javascript" src="ui/js/vendor/underscore.js"></script>
  <script type="text/javascript" src="ui/js/vendor/jquery.js"></script>
  <script type="text/javascript" src="ui/js/vendor/knockout.js"></script>
  <script type="text/javascript" src="ui/js/app.js"></script>
  <script type="text/javascript" src="ui/js/util/util.js"></script>
  <script type="text/javascript" src="ui/js/util/grid.js"></script>
  <script type="text/javascript" src="ui/js/extender/card-number.js"></script>
  <script type="text/javascript" src="ui/js/custom-binding/effort-rating.js"></script>
  <script type="text/javascript" src="ui/js/custom-binding/effort-note.js"></script>
  <script type="text/javascript" src="ui/js/custom-binding/autocomplete.js"></script>
  <script type="text/javascript" src="ui/js/page/header.js"></script>
</head>
<body>
