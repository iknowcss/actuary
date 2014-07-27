(function (actuary) {

  var doc = document.documentElement;
        
  actuary.util = {

    getWindowScroll: function () {
      return {
        top: (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
        left: (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
      };
    }

  }

}(window.actuary));