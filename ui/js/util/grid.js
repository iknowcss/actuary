(function (actuary) {

  var COOKIE_NAME = '__actuary-grid';

  window.addEventListener('load', function () {
    if (actuary.util.readCookie(COOKIE_NAME) == 1) {
      actuary.grid(true);
    }
  });

  actuary.grid = function (dontSetCookie) {
    document.body.classList.add('grid');
    if (!dontSetCookie) {
      actuary.util.setCookie(COOKIE_NAME, 1, 1);
    }
  };

  actuary.nogrid = function () {
    document.body.classList.remove('grid');
    actuary.util.unsetCookie(COOKIE_NAME);
  };
  
}(window.actuary));
