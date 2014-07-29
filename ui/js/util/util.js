(function (actuary) {

  var doc = document.documentElement;
        
  actuary.util = {

    getWindowScroll: function () {
      return {
        top: (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
        left: (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
      };
    },

    setCookie: function (name, value, expireInDays) {
      var expireDate = new Date();
      expireDate.setTime(expireDate.getTime() + (expireInDays * 24 * 60 * 60 * 1000));
      actuary.util.writeCookie(name, value, expireDate);
    },

    unsetCookie: function (name) {
      var expireDate = new Date();
      expireDate.setTime(expireDate.getTime() - (24 * 60 * 60 * 1000));
      actuary.util.writeCookie(name, '', expireDate);
    },

    writeCookie: function (name, value, expireDate) {
      document.cookie = name + '=' + value + '; ' + 'expires=' + expireDate.toGMTString();
    },

    readCookie: function (name) {
      var cookies = document.cookie.toString().split(';'),
          parts,
          i;

      for (i = 0; i < cookies.length; i++) {
        parts = cookies[i].split('=');
        if (parts[0].trim() == name) {
          return parts[1].trim();
        }
      }
    }

  }

}(window.actuary));