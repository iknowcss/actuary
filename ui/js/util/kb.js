(function (actuary, $) {

  var map = {};

  $(window).on('keydown', function (e) {
    var activated = false,
        i;
    if (e.ctrlKey || e.metaKey) {
      for (i in map) {
        if (map.hasOwnProperty(e.keyCode.toString())) {
          _.each(map[i], function (callback) {
            callback.call(null, e);
            activated = true;
          });
        }
      }
      if (activated) {
        e.preventDefault();
        return false;
      }
    }
  });

  actuary.kb = {

    setShortcut: function (letter, callback) {
      var code;
      try {
        code = letter.toUpperCase().charCodeAt(0).toString();
        if (!map.hasOwnProperty(code)) {
          map[code] = [callback];
        } else {
          map[code].push(callback);
        }
      } catch (e) {
        throw 'Could not set keyboard shortcut for letter: ' + letter;
      }
    }

  };

}(window.actuary, window.jQuery));
