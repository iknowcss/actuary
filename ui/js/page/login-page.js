(function (actuary, ko) {

  window.addEventListener('DOMContentLoaded', function () {
    ko.applyBindings(new actuary.vm.LoginForm());
  });

}(window.actuary, window.ko));